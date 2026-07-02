"""
Database configuration for the Birthday Automation System.

This file sets up the SQLite database connection using SQLAlchemy.
SQLite stores everything in a single file: birthday.db
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite database file will be created in the backend folder
SQLALCHEMY_DATABASE_URL = "sqlite:///./birthday.db"

# "check_same_thread" is needed only for SQLite to allow usage
# across multiple threads (FastAPI + APScheduler both access the DB).
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# SessionLocal is a factory that creates new database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class that all database models will inherit from
Base = declarative_base()


def get_db():
    """
    Dependency function used by FastAPI routes to get a database session.
    Ensures the session is always closed after the request finishes.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
