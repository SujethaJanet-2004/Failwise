                                        FailWise 🚀

Turn interview failures into data-driven insights

FailWise is a full-stack web application that helps candidates analyze why they fail interviews by tracking real interview attempts, identifying recurring weak areas, and converting them into actionable improvement insights.

Instead of vague feedback or generic advice, FailWise focuses on patterns in actual interview outcomes.

🌐 Live Demo

Frontend (Netlify): https://quiet-speculoos-50739e.netlify.app

Backend API (Render): https://failwise.onrender.com

API Endpoint: https://failwise.onrender.com/attempts

⚠️ Note: Backend may take ~30–50 seconds to respond on first request due to free-tier cold start.

🧠 Problem Statement

Most interview platforms focus on practice, not reflection.

Candidates often:

- Attend multiple interviews
- Fail at different stages
- Receive little or no feedback
- Don’t know what to improve next
- FailWise solves this by:
- Logging real interview attempts
- Tracking failure patterns by topic
- Highlighting the weakest areas using analytics
- Providing focused, data-backed recommendations

👥 Target Users

- Freshers and early-career professionals
- Candidates attending frequent technical interviews
- Anyone who wants structured insight into interview performance

✨ Key Features

📌 Interview Attempt Tracking

- Company name
- Round type & sub-type
- Topic / skill tested
- Date attended
- Outcome (Pass / Fail)
- Self-score (1–10)
- Failure or performance reason

📊 Analytics & Insights

- Total attempts
- Most failed topic
- Weakest topic (based on failure rate)
- Failure percentage per topic
- Defensive logic (minimum attempts before insights)

🔄 Full CRUD Support

- Add new interview attempts
- Edit incorrect entries
- Delete attempts
- Persistent storage via database

🌍 Production Deployment

- Backend deployed on Render
- Frontend deployed on Netlify
- REST API communication
- Real database (SQLite)

🏗️ Tech Stack

Frontend

- HTML
- CSS
- Vanilla JavaScript
- Netlify (hosting)

Backend

- Python
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- SQLite
- Render (deployment)

🧩 Architecture Overview

Frontend (Netlify)
   |
   |  REST API (JSON)
   |
Backend (Flask on Render)
   |
Database (SQLite)


🔌 API Endpoints

Method	Endpoint	Description
GET	/attempts	Fetch all interview attempts
GET	/attempts/<id>	Fetch attempt by ID
POST	/attempts	Create a new attempt
PUT	/attempts/<id>	Update an existing attempt
DELETE	/attempts/<id>	Delete an attempt

🛠️ Local Setup (Optional)

Backend
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python app.py

Frontend

Open index.html directly in browser
(or use Live Server in VS Code)

📌 Project Status

✅ MVP complete
✅ Fully deployed
✅ Full CRUD implemented
✅ Analytics working
🔒 Scope locked (no feature creep)

📈 What This Project Demonstrates

- Full-stack development (frontend + backend)
- REST API design
- Database modeling
- Analytics from real data
- Production deployment
- Clean UI & UX decisions
- Defensive programming

🧠 Future Enhancements (Optional)

- Authentication & user accounts
- Advanced trend analytics
- Charts & visualizations
- Export insights as reports

👤 Author

FailWise — built as a learning-focused, real-world full-stack project.
