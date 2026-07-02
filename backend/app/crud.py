"""
CRUD (Create, Read, Update, Delete) operations for Member records.

Keeping these functions separate from the routes keeps the API
layer thin and makes the database logic reusable and testable.
"""

from sqlalchemy.orm import Session
from . import models, schemas


def get_members(db: Session):
    """Return all members, most recently added first."""
    return db.query(models.Member).order_by(models.Member.id.desc()).all()


def get_member(db: Session, member_id: int):
    """Return a single member by id, or None if not found."""
    return db.query(models.Member).filter(models.Member.id == member_id).first()


def create_member(db: Session, member: schemas.MemberCreate):
    """Create and save a new member record."""
    db_member = models.Member(
        name=member.name,
        phone=member.phone,
        dob=member.dob,
    )
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member


def update_member(db: Session, member_id: int, member: schemas.MemberUpdate):
    """Update an existing member. Returns None if member doesn't exist."""
    db_member = get_member(db, member_id)
    if not db_member:
        return None

    db_member.name = member.name
    db_member.phone = member.phone
    db_member.dob = member.dob

    db.commit()
    db.refresh(db_member)
    return db_member


def delete_member(db: Session, member_id: int):
    """Delete a member. Returns True if deleted, False if not found."""
    db_member = get_member(db, member_id)
    if not db_member:
        return False

    db.delete(db_member)
    db.commit()
    return True
