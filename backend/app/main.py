"""
Birthday Automation System - Backend Entry Point.

Run with:
    uvicorn app.main:app --reload
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

from . import models
from .database import engine
from .routers import members
from .scheduler import start_scheduler, stop_scheduler, check_birthdays_and_send_messages

# Create all database tables (if they don't already exist)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Birthday Automation System API")

# Allow the React frontend (running on a different port) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server default port
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Turns Pydantic validation errors into a simple, friendly
    error message the frontend can display directly.
    """
    errors = [err["msg"] for err in exc.errors()]
    return JSONResponse(
        status_code=422,
        content={"detail": "; ".join(errors)},
    )


@app.on_event("startup")
def on_startup():
    """Start the birthday scheduler when the API server starts."""
    start_scheduler()


@app.on_event("shutdown")
def on_shutdown():
    """Stop the scheduler cleanly when the API server shuts down."""
    stop_scheduler()


@app.get("/")
def root():
    """Basic health-check endpoint."""
    return {"message": "Birthday Automation System API is running"}


@app.post("/api/run-birthday-check")
def run_birthday_check_now():
    """
    Manually trigger the birthday check (useful for testing without
    waiting until 6:00 AM). Not required for normal operation.
    """
    check_birthdays_and_send_messages()
    return {"message": "Birthday check executed. See backend console for output."}


# Register member-related routes
app.include_router(members.router)
