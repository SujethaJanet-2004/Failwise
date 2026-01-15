from extensions import db


class InterviewAttempt(db.Model):
    __tablename__ = "interview_attempts"

    id = db.Column(db.Integer, primary_key=True)

    company_name = db.Column(db.String(100), nullable=False)
    round_type = db.Column(db.String(50), nullable=False)
    round_sub_type = db.Column(db.String(50), nullable=False)

    topic = db.Column(db.String(100), nullable=False)
    date_attended = db.Column(db.Date, nullable=False)

    outcome = db.Column(db.String(10), nullable=False)

    self_score = db.Column(db.Integer, nullable=True)
    self_score_reason = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "company_name": self.company_name,
            "round_type": self.round_type,
            "round_sub_type": self.round_sub_type,
            "topic": self.topic,
            "date_attended": self.date_attended.isoformat(),
            "outcome": self.outcome,
            "self_score": self.self_score,
            "self_score_reason": self.self_score_reason,
        }

    def __repr__(self):
        return f"<InterviewAttempt {self.id} - {self.company_name} ({self.topic})>"




