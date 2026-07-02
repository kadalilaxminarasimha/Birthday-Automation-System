"""
API routes for managing members.

Base path: /api/members
"""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import ValidationError
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/api/members", tags=["members"])


@router.get("/", response_model=list[schemas.MemberOut])
def list_members(db: Session = Depends(get_db)):
    """Get all members."""
    return crud.get_members(db)


@router.get("/{member_id}", response_model=schemas.MemberOut)
def get_member(member_id: int, db: Session = Depends(get_db)):
    """Get a single member by id."""
    member = crud.get_member(db, member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    return member


@router.post("/", response_model=schemas.MemberOut, status_code=201)
def create_member(member: schemas.MemberCreate, db: Session = Depends(get_db)):
    """Create a new member."""
    return crud.create_member(db, member)


@router.put("/{member_id}", response_model=schemas.MemberOut)
def update_member(
    member_id: int, member: schemas.MemberUpdate, db: Session = Depends(get_db)
):
    """Update an existing member."""
    updated = crud.update_member(db, member_id, member)
    if not updated:
        raise HTTPException(status_code=404, detail="Member not found")
    return updated


@router.delete("/{member_id}", status_code=204)
def delete_member(member_id: int, db: Session = Depends(get_db)):
    """Delete a member."""
    deleted = crud.delete_member(db, member_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Member not found")
    return None
