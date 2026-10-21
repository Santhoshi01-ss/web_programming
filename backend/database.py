import os
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()

def init_db(app):
    # Support PostgreSQL via DATABASE_URL or fallback to local SQLite
    database_url = os.environ.get("DATABASE_URL", "sqlite:///vihan_veg.db")
    if database_url.startswith("postgres://"):
        database_url = database_url.replace("postgres://", "postgresql://", 1)

    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "vihan-veg-super-secret-key-2026")
    
    db.init_app(app)
