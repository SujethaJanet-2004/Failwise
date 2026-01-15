from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
from extensions import db
import os

app = Flask(__name__)
CORS(app)

# --------------------
# Database config
# --------------------
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///failwise.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# Import models AFTER db init
from models import InterviewAttempt


# --------------------
# Home
# --------------------
@app.route("/")
def home():
    return {"status": "FailWise backend running"}


# --------------------
# GET all attempts
# --------------------
@app.route("/attempts", methods=["GET"])
def get_attempts():
    attempts = InterviewAttempt.query.all()
    return jsonify([attempt.to_dict() for attempt in attempts])


# --------------------
# GET single attempt (for Edit)
# --------------------
@app.route("/attempts/<int:id>", methods=["GET"])
def get_attempt(id):
    attempt = InterviewAttempt.query.get_or_404(id)
    return jsonify(attempt.to_dict())


# --------------------
# POST new attempt
# --------------------
@app.route("/attempts", methods=["POST"])
def create_attempt():
    data = request.get_json()

    new_attempt = InterviewAttempt(
        company_name=data["company_name"],
        round_type=data["round_type"],
        round_sub_type=data["round_sub_type"],
        topic=data["topic"],
        date_attended=datetime.strptime(
            data["date_attended"], "%Y-%m-%d"
        ).date(),
        outcome=data["outcome"],
        self_score=data.get("self_score"),
        self_score_reason=data.get("self_score_reason"),
    )

    db.session.add(new_attempt)
    db.session.commit()

    return {"message": "Interview attempt added successfully"}, 201


# --------------------
# PUT update attempt (EDIT)
# --------------------
@app.route("/attempts/<int:id>", methods=["PUT"])
def update_attempt(id):
    attempt = InterviewAttempt.query.get_or_404(id)
    data = request.get_json()

    attempt.company_name = data["company_name"]
    attempt.round_type = data["round_type"]
    attempt.round_sub_type = data["round_sub_type"]
    attempt.topic = data["topic"]
    attempt.date_attended = datetime.strptime(
        data["date_attended"], "%Y-%m-%d"
    ).date()
    attempt.outcome = data["outcome"]
    attempt.self_score = data.get("self_score")
    attempt.self_score_reason = data.get("self_score_reason")

    db.session.commit()

    return {"message": "Interview attempt updated successfully"}


# --------------------
# DELETE attempt
# --------------------
@app.route("/attempts/<int:id>", methods=["DELETE"])
def delete_attempt(id):
    attempt = InterviewAttempt.query.get_or_404(id)

    db.session.delete(attempt)
    db.session.commit()

    return {"message": "Interview attempt deleted successfully"}

# --------------------
# App start
# --------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)




