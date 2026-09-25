# 🎂 Birthday Automation System (Version 1)

A simple, beginner-friendly full-stack app that stores people's birthdays
and automatically prepares a birthday message on their special day.

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Python FastAPI
- **Database:** SQLite (via SQLAlchemy)
- **Scheduler:** APScheduler (runs daily at 6:00 AM)

## Project Structure

```
birthday-automation-system/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app entry point
│   │   ├── database.py      # SQLite/SQLAlchemy setup
│   │   ├── models.py        # Member database model
│   │   ├── schemas.py       # Pydantic validation schemas
│   │   ├── crud.py          # Database operations
│   │   ├── scheduler.py     # Daily 6 AM birthday checker
│   │   └── routers/
│   │       └── members.py   # /api/members endpoints
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── api/api.js           # Axios calls to backend
    │   ├── components/          # Navbar, Button, Card, Form, Table
    │   ├── pages/                # Home, AddMember, Members
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```


