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

## Getting Started

### 1. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API will run at **http://localhost:8000**
Interactive API docs available at **http://localhost:8000/docs**

A `birthday.db` SQLite file is created automatically on first run.

### 2. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will run at **http://localhost:5173**

### 3. Using the App

1. Open http://localhost:5173
2. Click **Get Started** → fill in Name, Phone, Date of Birth → **Save Member**
3. View, edit, or delete members on the **Members** page

## How the Scheduler Works

Every day at **6:00 AM**, the backend automatically:
1. Checks all members in the database
2. Finds anyone whose birthday (month + day) matches today
3. Prints a message like this to the backend console:

```
Happy Birthday, John! Wishing you a wonderful year ahead!
```

To test this without waiting until 6 AM, you can manually trigger it:

```bash
curl -X POST http://localhost:8000/api/run-birthday-check
```

(In a future version, this console print can be replaced with an actual
WhatsApp/SMS/Email sending service — the code is structured so that only
`scheduler.py` needs to change.)

## API Endpoints

| Method | Endpoint              | Description          |
|--------|------------------------|-----------------------|
| GET    | /api/members/          | List all members      |
| GET    | /api/members/{id}      | Get one member         |
| POST   | /api/members/          | Create a member        |
| PUT    | /api/members/{id}      | Update a member        |
| DELETE | /api/members/{id}      | Delete a member        |

## Notes

This is Version 1: intentionally simple, with no AI, login, notifications,
or analytics. The codebase is modular so new features (real message
sending, authentication, reminders, etc.) can be added later without
rewriting existing logic.
