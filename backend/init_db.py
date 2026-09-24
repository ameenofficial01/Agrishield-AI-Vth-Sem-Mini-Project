from app.database import SessionLocal, engine, Base
import app.models as models
from app.auth import get_password_hash

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

admin = db.query(models.User).filter(models.User.email == "admin@agrishield.com").first()
if not admin:
    admin = models.User(
        name="Admin User",
        email="admin@agrishield.com",
        password_hash=get_password_hash("admin123"),
        role="admin",
        state="Karnataka",
        district="Bengaluru",
        taluk="Bengaluru North"
    )
    db.add(admin)

farmer = db.query(models.User).filter(models.User.email == "farmer@agrishield.com").first()
if not farmer:
    farmer = models.User(
        name="Demo Farmer",
        email="farmer@agrishield.com",
        password_hash=get_password_hash("farmer123"),
        role="farmer",
        state="Kerala",
        district="Ernakulam",
        taluk="Aluva"
    )
    db.add(farmer)

db.commit()
db.close()
print("Demo users created: admin@agrishield.com/admin123 and farmer@agrishield.com/farmer123")
