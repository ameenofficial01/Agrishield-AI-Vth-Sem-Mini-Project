import re
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from .config import settings

db_url = settings.DATABASE_URL.strip().strip("'").strip('"')

# If user copied the CLI command "psql postgresql://..." or similar
if "psql " in db_url:
    match = re.search(r'(postgres(?:ql)?://[^\s\'"]+)', db_url)
    if match:
        db_url = match.group(1)

# Render provides postgres:// which SQLAlchemy 1.4+ / 2.0 deprecated in favor of postgresql://
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

# Safety fallback: if DATABASE_URL is not a valid URL scheme, fall back to SQLite to prevent crashing
if not db_url.startswith("sqlite") and not db_url.startswith("postgresql"):
    print(f"[AgriShield DB] WARNING: Unrecognized DATABASE_URL '{db_url}'. Falling back to SQLite.")
    db_url = "sqlite:///./agrishield.db"

connect_args = {}
if db_url.startswith("sqlite"):
    connect_args["check_same_thread"] = False

engine = create_engine(db_url, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
