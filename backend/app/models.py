"""
Database models for the Birthday Automation System.
"""

from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.sql import func
from .database import Base


class Member(Base):
    """
    Represents a person whose birthday we track.

    Columns:
        id         - unique identifier (primary key)
        name       - full name of the member
        phone      - phone number of the member
        dob        - date of birth
        created_at - timestamp of when the record was created
    """

    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    dob = Column(Date, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
