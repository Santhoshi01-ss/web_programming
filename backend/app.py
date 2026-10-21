import os
from functools import wraps
from flask import Flask, request, jsonify
from flask_cors import CORS
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature

from database import db, init_db
from models import MenuItem, Reservation, Admin, Enquiry

app = Flask(__name__)
init_db(app)

# Enable CORS for frontend interactions
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Token Serializer for Admin Authentication
TOKEN_SECRET = app.config.get("SECRET_KEY", "vihan-veg-super-secret-key-2026")
serializer = URLSafeTimedSerializer(TOKEN_SECRET)

def generate_admin_token(username):
    return serializer.dumps({"username": username}, salt="admin-login")

def verify_admin_token(token):
    try:
        # Token valid for 24 hours (86400 seconds)
        data = serializer.loads(token, salt="admin-login", max_age=86400)
        return data.get("username")
    except (SignatureExpired, BadSignature):
        return None

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        token = None
        if auth_header.startswith("Bearer "):
            token = auth_header.split(" ", 1)[1]
        elif "token" in request.args:
            token = request.args.get("token")

        if not token:
            return jsonify({"error": "Authorization token required"}), 401

        username = verify_admin_token(token)
        if not username:
            return jsonify({"error": "Invalid or expired token"}), 401

        admin = Admin.query.filter_by(username=username).first()
        if not admin:
            return jsonify({"error": "Admin account not found"}), 401

        return f(*args, **kwargs)
    return decorated


# ==========================================
# HEALTH & GENERAL
# ==========================================
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "restaurant": "OHO! Veg Restaurant",
        "message": "OHO!: An upbeat, and memorable expression of high quality vegetarian dining"
    })


# ==========================================
# PUBLIC MENU ENDPOINTS
# ==========================================
@app.route("/api/menu", methods=["GET"])
def get_menu():
    category = request.args.get("category")
    search = request.args.get("search", "").strip().lower()
    featured_only = request.args.get("featured", "").lower() == "true"
    available_only = request.args.get("available_only", "true").lower() == "true"

    query = MenuItem.query

    if available_only:
        query = query.filter_by(is_available=True)

    if category and category != "all":
        query = query.filter_by(category=category)

    if featured_only:
        query = query.filter_by(is_featured=True)

    items = query.order_by(MenuItem.category, MenuItem.name).all()

    if search:
        items = [
            item for item in items 
            if search in item.name.lower() or (item.description and search in item.description.lower())
        ]

    return jsonify({
        "total": len(items),
        "items": [item.to_dict() for item in items]
    })

@app.route("/api/menu/<int:item_id>", methods=["GET"])
def get_menu_item(item_id):
    item = MenuItem.query.get(item_id)
    if not item:
        return jsonify({"error": "Menu item not found"}), 404
    return jsonify(item.to_dict())


# ==========================================
# PUBLIC RESERVATIONS & ENQUIRIES
# ==========================================
@app.route("/api/reservations", methods=["POST"])
def create_reservation():
    data = request.get_json() or {}
    
    customer_name = data.get("customer_name", "").strip()
    phone = data.get("phone", "").strip()
    booking_date = data.get("booking_date", "").strip()
    booking_time = data.get("booking_time", "").strip()
    guests = data.get("guests")
    email = data.get("email", "").strip()
    special_requests = data.get("special_requests", "").strip()

    if not customer_name:
        return jsonify({"error": "Customer name is required"}), 400
    if not phone or len(phone) < 8:
        return jsonify({"error": "A valid phone number is required"}), 400
    if not booking_date:
        return jsonify({"error": "Booking date is required"}), 400
    if not booking_time:
        return jsonify({"error": "Booking time slot is required"}), 400
    
    try:
        guests = int(guests)
        if guests < 1 or guests > 30:
            return jsonify({"error": "Number of guests must be between 1 and 30"}), 400
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid guest count"}), 400

    new_reservation = Reservation(
        customer_name=customer_name,
        phone=phone,
        email=email,
        booking_date=booking_date,
        booking_time=booking_time,
        guests=guests,
        special_requests=special_requests,
        status="pending"
    )

    db.session.add(new_reservation)
    db.session.commit()

    return jsonify({
        "message": "Reservation request received successfully! Our host will confirm shortly.",
        "reservation": new_reservation.to_dict()
    }), 201

@app.route("/api/enquiries", methods=["POST"])
def submit_enquiry():
    data = request.get_json() or {}
    customer_name = data.get("customer_name", "").strip()
    email = data.get("email", "").strip()
    phone = data.get("phone", "").strip()
    message = data.get("message", "").strip()

    if not customer_name or not email or not message:
        return jsonify({"error": "Name, email, and message are required"}), 400

    enquiry = Enquiry(
        customer_name=customer_name,
        email=email,
        phone=phone,
        message=message,
        status="unread"
    )
    db.session.add(enquiry)
    db.session.commit()

    return jsonify({
        "message": "Thank you for reaching out! We have received your inquiry.",
        "enquiry": enquiry.to_dict()
    }), 201


# ==========================================
# ADMIN AUTHENTICATION
# ==========================================
@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.get_json() or {}
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()

    if not username or not password:
        return jsonify({"error": "Username and password required"}), 400

    admin = Admin.query.filter_by(username=username).first()
    if not admin or not admin.check_password(password):
        return jsonify({"error": "Invalid admin username or password"}), 401

    token = generate_admin_token(admin.username)
    return jsonify({
        "message": "Login successful",
        "token": token,
        "admin": admin.to_dict()
    })

@app.route("/api/admin/verify", methods=["GET"])
@admin_required
def verify_session():
    return jsonify({"valid": True, "message": "Admin session authenticated"})


# ==========================================
# ADMIN DASHBOARD & MANAGEMENT ENDPOINTS
# ==========================================
@app.route("/api/admin/stats", methods=["GET"])
@admin_required
def admin_stats():
    total_menu = MenuItem.query.count()
    total_reservations = Reservation.query.count()
    pending_reservations = Reservation.query.filter_by(status="pending").count()
    confirmed_reservations = Reservation.query.filter_by(status="confirmed").count()
    unread_enquiries = Enquiry.query.filter_by(status="unread").count()

    return jsonify({
        "total_menu_items": total_menu,
        "total_reservations": total_reservations,
        "pending_reservations": pending_reservations,
        "confirmed_reservations": confirmed_reservations,
        "unread_enquiries": unread_enquiries
    })

# Admin Menu Management
@app.route("/api/admin/menu", methods=["GET"])
@admin_required
def admin_get_all_menu():
    items = MenuItem.query.order_by(MenuItem.id.desc()).all()
    return jsonify([item.to_dict() for item in items])

@app.route("/api/admin/menu", methods=["POST"])
@admin_required
def admin_create_menu():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    price = data.get("price")
    category = data.get("category", "breakfast").strip()

    if not name or price is None:
        return jsonify({"error": "Dish name and price are required"}), 400

    try:
        price = float(price)
    except ValueError:
        return jsonify({"error": "Price must be a valid number"}), 400

    new_dish = MenuItem(
        name=name,
        description=data.get("description", "").strip(),
        price=price,
        category=category,
        image_url=data.get("image_url", "").strip() or "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
        is_available=bool(data.get("is_available", True)),
        is_featured=bool(data.get("is_featured", False)),
        is_chef_special=bool(data.get("is_chef_special", False)),
        spice_level=data.get("spice_level", "medium"),
        dietary=data.get("dietary", "Pure Veg")
    )
    db.session.add(new_dish)
    db.session.commit()

    return jsonify({
        "message": f"'{new_dish.name}' added to menu successfully!",
        "item": new_dish.to_dict()
    }), 201

@app.route("/api/admin/menu/<int:item_id>", methods=["PATCH", "PUT"])
@admin_required
def admin_update_menu(item_id):
    item = MenuItem.query.get(item_id)
    if not item:
        return jsonify({"error": "Menu item not found"}), 404

    data = request.get_json() or {}

    if "name" in data:
        item.name = data["name"].strip()
    if "description" in data:
        item.description = data["description"].strip()
    if "price" in data:
        try:
            item.price = float(data["price"])
        except ValueError:
            pass
    if "category" in data:
        item.category = data["category"]
    if "image_url" in data:
        item.image_url = data["image_url"].strip()
    if "is_available" in data:
        item.is_available = bool(data["is_available"])
    if "is_featured" in data:
        item.is_featured = bool(data["is_featured"])
    if "is_chef_special" in data:
        item.is_chef_special = bool(data["is_chef_special"])
    if "spice_level" in data:
        item.spice_level = data["spice_level"]
    if "dietary" in data:
        item.dietary = data["dietary"]

    db.session.commit()
    return jsonify({
        "message": f"'{item.name}' updated successfully",
        "item": item.to_dict()
    })

@app.route("/api/admin/menu/<int:item_id>", methods=["DELETE"])
@admin_required
def admin_delete_menu(item_id):
    item = MenuItem.query.get(item_id)
    if not item:
        return jsonify({"error": "Menu item not found"}), 404

    name = item.name
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": f"'{name}' deleted successfully"})

# Admin Reservations Management
@app.route("/api/admin/reservations", methods=["GET"])
@admin_required
def admin_get_reservations():
    status = request.args.get("status")
    query = Reservation.query
    if status and status != "all":
        query = query.filter_by(status=status)
    reservations = query.order_by(Reservation.id.desc()).all()
    return jsonify([res.to_dict() for res in reservations])

@app.route("/api/admin/reservations/<int:res_id>", methods=["PATCH"])
@admin_required
def admin_update_reservation(res_id):
    reservation = Reservation.query.get(res_id)
    if not reservation:
        return jsonify({"error": "Reservation not found"}), 404

    data = request.get_json() or {}
    new_status = data.get("status")

    if new_status in ["pending", "confirmed", "cancelled"]:
        reservation.status = new_status
        db.session.commit()
        return jsonify({
            "message": f"Reservation #{reservation.id} status updated to {new_status}",
            "reservation": reservation.to_dict()
        })

    return jsonify({"error": "Invalid status value"}), 400

# Admin Enquiries Management
@app.route("/api/admin/enquiries", methods=["GET"])
@admin_required
def admin_get_enquiries():
    enquiries = Enquiry.query.order_by(Enquiry.id.desc()).all()
    return jsonify([enq.to_dict() for enq in enquiries])

@app.route("/api/admin/enquiries/<int:enq_id>", methods=["PATCH"])
@admin_required
def admin_update_enquiry(enq_id):
    enquiry = Enquiry.query.get(enq_id)
    if not enquiry:
        return jsonify({"error": "Enquiry not found"}), 404

    data = request.get_json() or {}
    if "status" in data and data["status"] in ["unread", "read", "replied"]:
        enquiry.status = data["status"]
        db.session.commit()
        return jsonify({"message": "Enquiry status updated", "enquiry": enquiry.to_dict()})

    return jsonify({"error": "Invalid status value"}), 400


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting OHO! Veg Restaurant API on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=True)
