"""
Birthday Scheduler.

Every day at 6:00 AM, this job checks the database for members
whose birthday (month + day) matches today's date, and prints a
birthday message to the console.

In a future version, this is where you would plug in an actual
message-sending service (e.g. WhatsApp, SMS, Email) instead of
printing to the console.
"""

from datetime import date

from apscheduler.schedulers.background import BackgroundScheduler

from .database import SessionLocal
from . import models

scheduler = BackgroundScheduler()


def check_birthdays_and_send_messages():
    """
    Core job logic:
    1. Get today's date.
    2. Find all members whose month and day of birth match today.
    3. Print a birthday message for each of them.
    """
    db = SessionLocal()
    try:
        today = date.today()
        members = db.query(models.Member).all()

        todays_birthday_members = [
            member
            for member in members
            if member.dob.month == today.month and member.dob.day == today.day
        ]

        if not todays_birthday_members:
            print(f"[Scheduler] No birthdays today ({today.isoformat()}).")
            return

        for member in todays_birthday_members:
            message = (
                f"Happy Birthday, {member.name}! "
                f"Wishing you a wonderful year ahead!"
            )
            # For now we just print the message to the console.
            # This is where WhatsApp/SMS/Email sending would go later.
            print(f"[Scheduler] Sending to {member.phone}: {message}")
    finally:
        db.close()


def start_scheduler():
    """
    Starts the background scheduler and registers the daily job
    to run every day at 6:00 AM server time.
    """
    scheduler.add_job(
        check_birthdays_and_send_messages,
        trigger="cron",
        hour=6,
        minute=0,
        id="daily_birthday_check",
        replace_existing=True,
    )
    scheduler.start()
    print("[Scheduler] Birthday scheduler started. Runs daily at 6:00 AM.")


def stop_scheduler():
    """Stops the scheduler gracefully (used on app shutdown)."""
    if scheduler.running:
        scheduler.shutdown()
