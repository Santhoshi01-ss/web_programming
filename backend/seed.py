from database import db, init_db
from models import MenuItem, Reservation, Admin, Enquiry
from flask import Flask

app = Flask(__name__)
init_db(app)

SAMPLE_MENU = [
    # Breakfast
    {
        "name": "Mysore Ghee Roast Dosa",
        "description": "Crisp golden crepe smeared with spicy red garlic chutney, filled with potato masala, roasted in pure desi ghee. Served with 3 chutneys & sambar.",
        "price": 145.0,
        "category": "breakfast",
        "image_url": "/images/dishes/mysore_dosa.jpg",
        "is_available": True,
        "is_featured": True,
        "is_chef_special": True,
        "spice_level": "medium",
        "dietary": "Pure Veg • Chef's Signature"
    },
    {
        "name": "Ghee Button Podi Idli (14 pcs)",
        "description": "Bite-sized melt-in-mouth steamed rice cakes tossed in aromatic gunpowder (karam podi) and fresh organic cow ghee.",
        "price": 120.0,
        "category": "breakfast",
        "image_url": "/images/dishes/podi_idli.jpg",
        "is_available": True,
        "is_featured": True,
        "is_chef_special": False,
        "spice_level": "medium",
        "dietary": "Pure Veg • Gluten-Free"
    },
    {
        "name": "Crispy Medu Vada (2 pcs)",
        "description": "Traditional deep-fried crispy golden urad dal doughnuts infused with crushed pepper, ginger, and curry leaves. Served with coconut chutney and piping hot drumstick sambar.",
        "price": 40.0,
        "category": "breakfast",
        "image_url": "/images/dishes/medu_vada.jpg",
        "is_available": True,
        "is_featured": False,
        "is_chef_special": False,
        "spice_level": "mild",
        "dietary": "Pure Veg"
    },
    {
        "name": "Rava Onion Masala Dosa",
        "description": "Lacy, crispy semolina crepe studded with finely chopped shallots, green chillies, and cumin, stuffed with seasoned mashed potatoes.",
        "price": 160.0,
        "category": "breakfast",
        "image_url": "/images/dishes/rava_dosa.jpg",
        "is_available": True,
        "is_featured": False,
        "is_chef_special": False,
        "spice_level": "medium",
        "dietary": "Pure Veg"
    },

    # South Indian
    {
        "name": "OHO! Royal Grand South Indian Thali",
        "description": "Grand feast served with Steamed Sona Masoori Rice, Pooris, Special Poriyal, Kootu, Drumstick Sambar, Tomato Rasam, Mor Kuzhambu, Curd, Appalam, Pickle, and Elaneer Payasam.",
        "price": 260.0,
        "category": "south_indian",
        "image_url": "/images/dishes/south_thali.jpg",
        "is_available": True,
        "is_featured": True,
        "is_chef_special": True,
        "spice_level": "medium",
        "dietary": "Pure Veg • Unlimited Refills"
    },
    {
        "name": "Hyderabadi Veg Dum Biryani",
        "description": "Long-grain aged basmati rice slow-cooked in handi with garden-fresh veggies, aromatic whole spices, and saffron milk. Served with Mirchi Ka Salan and creamy mint raita.",
        "price": 240.0,
        "category": "south_indian",
        "image_url": "/images/dishes/veg_biryani.jpg",
        "is_available": True,
        "is_featured": True,
        "is_chef_special": True,
        "spice_level": "spicy",
        "dietary": "Pure Veg • Traditional Handi"
    },
    {
        "name": "Bisi Bele Bath with Kara Boondi",
        "description": "Karnataka's beloved one-pot rice and lentil delicacy simmered with vegetables, tamarind, and secret 14-spice blend, topped with pure ghee and crunchy boondi.",
        "price": 140.0,
        "category": "south_indian",
        "image_url": "/images/dishes/bisi_bele_bath.jpg",
        "is_available": True,
        "is_featured": False,
        "is_chef_special": False,
        "spice_level": "medium",
        "dietary": "Pure Veg"
    },

    # North Indian
    {
        "name": "Paneer Tikka Butter Masala",
        "description": "Charcoal-tandoor grilled cottage cheese cubes simmered in a velvety, rich tomato-cashew satin gravy with fresh fenugreek and butter.",
        "price": 275.0,
        "category": "north_indian",
        "image_url": "/images/dishes/paneer_butter_masala.jpg",
        "is_available": True,
        "is_featured": True,
        "is_chef_special": True,
        "spice_level": "mild",
        "dietary": "Pure Veg • Rich & Creamy"
    },
    {
        "name": "Dal Makhani (Slow-Cooked 18 Hours)",
        "description": "Whole black lentils and kidney beans slow-simmered overnight over smoldering charcoal, finished with artisanal white butter and fresh cream.",
        "price": 220.0,
        "category": "north_indian",
        "image_url": "/images/dishes/dal_makhani.jpg",
        "is_available": True,
        "is_featured": True,
        "is_chef_special": False,
        "spice_level": "mild",
        "dietary": "Pure Veg • Signature Lentils"
    },
    {
        "name": "Amritsari Kadhai Paneer",
        "description": "Fresh paneer blocks and crunchy bell peppers tossed in a robust crushed coriander and dry red chilli masala in an iron kadhai.",
        "price": 260.0,
        "category": "north_indian",
        "image_url": "/images/dishes/kadhai_paneer.jpg",
        "is_available": True,
        "is_featured": False,
        "is_chef_special": False,
        "spice_level": "spicy",
        "dietary": "Pure Veg"
    },
    {
        "name": "Garlic Butter Naan & Laccha Paratha",
        "description": "Tandoor baked leavened bread brushed generously with garlic butter and fresh coriander, served alongside multi-layered whole wheat paratha.",
        "price": 75.0,
        "category": "north_indian",
        "image_url": "/images/dishes/garlic_naan.jpg",
        "is_available": True,
        "is_featured": False,
        "is_chef_special": False,
        "spice_level": "mild",
        "dietary": "Pure Veg • Fresh Tandoor"
    },

    # Chinese
    {
        "name": "Crispy Chilli Baby Corn",
        "description": "Tender baby corn spears batter-fried to golden crispness and wok-tossed with spring onions, bell peppers, and zesty Schezwan sauce.",
        "price": 210.0,
        "category": "chinese",
        "image_url": "/images/dishes/chilli_baby_corn.jpg",
        "is_available": True,
        "is_featured": True,
        "is_chef_special": False,
        "spice_level": "spicy",
        "dietary": "Pure Veg • Crispy Appetizer"
    },
    {
        "name": "Veg Hakka Noodles Supreme",
        "description": "Wok-tossed noodles with julienned bell peppers, shredded cabbage, carrots, garlic, and light sesame soy sauce.",
        "price": 195.0,
        "category": "chinese",
        "image_url": "/images/dishes/hakka_noodles.jpg",
        "is_available": True,
        "is_featured": False,
        "is_chef_special": False,
        "spice_level": "medium",
        "dietary": "Pure Veg"
    },
    {
        "name": "Paneer Manchurian Gravy",
        "description": "Crispy batter-coated cottage cheese cubes drenched in a thick savory garlic-ginger and scallion soy glaze.",
        "price": 230.0,
        "category": "chinese",
        "image_url": "/images/dishes/paneer_manchurian.jpg",
        "is_available": True,
        "is_featured": False,
        "is_chef_special": False,
        "spice_level": "medium",
        "dietary": "Pure Veg"
    },

    # Beverages
    {
        "name": "Kumbakonam Degree Filter Coffee",
        "description": "Authentic chicory-infused South Indian decoction brewed to perfection with frothy full-cream milk in traditional brass dabarah.",
        "price": 55.0,
        "category": "beverages",
        "image_url": "/images/dishes/filter_coffee.jpg",
        "is_available": True,
        "is_featured": True,
        "is_chef_special": True,
        "spice_level": "mild",
        "dietary": "Pure Veg • Traditional Brew"
    },
    {
        "name": "Crispy Golden Poori Bhaji (3 pcs)",
        "description": "Puffed golden whole-wheat pooris served with traditional mildly spiced potato bhaji masala, fresh coconut chutney, and tangy pickle.",
        "price": 110.0,
        "category": "breakfast",
        "image_url": "/images/dishes/poori_bhaji.jpg",
        "is_available": True,
        "is_featured": True,
        "is_chef_special": False,
        "spice_level": "mild",
        "dietary": "Pure Veg • Hot & Fresh"
    },
    {
        "name": "Special Golden Ghee Roast Dosa",
        "description": "Paper-thin, ultra-crisp golden crepe drenched in pure A2 desi cow ghee and roasted to perfection. Served with 3 house chutneys, potato masala, and piping hot sambar.",
        "price": 135.0,
        "category": "breakfast",
        "image_url": "/images/dishes/ghee_roast_dosa.jpg",
        "is_available": True,
        "is_featured": True,
        "is_chef_special": True,
        "spice_level": "medium",
        "dietary": "Pure Veg • Pure Desi Ghee"
    },

    # Desserts
    {
        "name": "Tender Coconut Elaneer Payasam",
        "description": "Coastal Karnataka specialty pudding crafted with tender coconut pulp, coconut milk, condensed milk, and roasted cashews.",
        "price": 130.0,
        "category": "desserts",
        "image_url": "/images/dishes/elaneer_payasam.jpg",
        "is_available": True,
        "is_featured": True,
        "is_chef_special": True,
        "spice_level": "mild",
        "dietary": "Pure Veg • Coastal Delicacy"
    },
    {
        "name": "Warm Gulab Jamun with Rabdi",
        "description": "Golden fried khoya dumplings soaked in rose and cardamom syrup, topped with thick, slow-reduced artisanal rabdi.",
        "price": 140.0,
        "category": "desserts",
        "image_url": "/images/dishes/gulab_jamun.jpg",
        "is_available": True,
        "is_featured": False,
        "is_chef_special": False,
        "spice_level": "mild",
        "dietary": "Pure Veg • Traditional Sweet"
    }
]

def seed_database():
    with app.app_context():
        db.create_all()

        # Seed Admin if not exists
        admin = Admin.query.filter_by(username="admin").first()
        if not admin:
            admin = Admin(username="admin")
            admin.set_password("vihanveg123")
            db.session.add(admin)
            print("Created default admin user: admin / vihanveg123")

        # Always refresh Menu Items with accurate pure vegetarian photos
        MenuItem.query.delete()
        for item in SAMPLE_MENU:
            dish = MenuItem(**item)
            db.session.add(dish)
        print(f"Seeded {len(SAMPLE_MENU)} delicious authentic vegetarian menu items.")

        # Seed Sample Reservations if empty
        if Reservation.query.count() == 0:
            res1 = Reservation(
                customer_name="Rajesh Sharma",
                phone="+91 98765 43210",
                email="rajesh.sharma@example.com",
                booking_date="2026-10-18",
                booking_time="19:30",
                guests=4,
                special_requests="Window seat for family dinner",
                status="confirmed"
            )
            res2 = Reservation(
                customer_name="Priya Venkat",
                phone="+91 98450 11223",
                email="priya.v@example.com",
                booking_date="2026-10-19",
                booking_time="20:00",
                guests=2,
                special_requests="Anniversary dinner, quiet table",
                status="pending"
            )
            res3 = Reservation(
                customer_name="Arun Kumar",
                phone="+91 97123 98765",
                email="arun.k@example.com",
                booking_date="2026-10-20",
                booking_time="13:00",
                guests=6,
                special_requests="High chair for toddler required",
                status="pending"
            )
            db.session.add_all([res1, res2, res3])
            print("Seeded sample reservations.")

        # Seed Sample Enquiries if empty
        if Enquiry.query.count() == 0:
            enq1 = Enquiry(
                customer_name="Sunil Mehta",
                email="sunil.mehta@example.com",
                phone="+91 99887 76655",
                message="Do you provide pure Jain food without onion and garlic for a party of 25 people?",
                status="unread"
            )
            enq2 = Enquiry(
                customer_name="Ananya Rao",
                email="ananya.rao@example.com",
                phone="+91 98223 34455",
                message="Wanted to inquire about outdoor catering for a family pooja next month.",
                status="read"
            )
            db.session.add_all([enq1, enq2])
            print("Seeded sample inquiries.")

        db.session.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()
