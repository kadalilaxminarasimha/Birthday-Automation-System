"""
Pydantic schemas used for validating incoming requests
and shaping outgoing responses.
"""

from datetime import date, datetime
from pydantic import BaseModel, field_validator


class MemberBase(BaseModel):
    """Shared fields between create/update/response schemas."""

    name: str
    phone: str
    dob: date

    @field_validator("name")
    @classmethod
    def name_must_not_be_empty(cls, value: str) -> str:
        value = value.strip()
        if len(value) < 2:
            raise ValueError("Name must be at least 2 characters long")
        return value

    @field_validator("phone")
    @classmethod
    def phone_must_be_valid(cls, value: str) -> str:
        value = value.strip()
        # Allow digits, spaces, +, - characters. Must contain 7-15 digits.
        digits = "".join(ch for ch in value if ch.isdigit())
        if len(digits) < 7 or len(digits) > 15:
            raise ValueError("Phone number must contain 7 to 15 digits")
        return value

    @field_validator("dob")
    @classmethod
    def dob_must_not_be_in_future(cls, value: date) -> date:
        if value > date.today():
            raise ValueError("Date of birth cannot be in the future")
        return value


class MemberCreate(MemberBase):
    """Schema used when creating a new member."""

    pass


class MemberUpdate(MemberBase):
    """Schema used when updating an existing member."""

    pass


class MemberOut(MemberBase):
    """Schema used when returning a member in API responses."""

    id: int
    created_at: datetime

    class Config:
        from_attributes = True
