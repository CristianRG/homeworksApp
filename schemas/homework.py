from schemas.user_homework import User_Homework
from bd import db_instance

class Homework(db_instance.Model):
    
    id_homework = db_instance.Column(db_instance.String(50), primary_key=True)
    id_user = db_instance.Column(db_instance.String(50), nullable=False)
    subject = db_instance.Column(db_instance.String(20), nullable=False)
    title = db_instance.Column(db_instance.String(30), nullable=False)
    description = db_instance.Column(db_instance.String(200))
    status = db_instance.Column(db_instance.Boolean(), nullable=False)
    drafting_date = db_instance.Column(db_instance.Date)
    deadline = db_instance.Column(db_instance.Date, nullable=False)
    # user_homework = db_instance.relationship('User_Homework')
    
    def __init__(self, id_homework, id_user, subject, title, description, status, drafting_date, deadline):
        self.id_homework = id_homework
        self.id_user = id_user
        self.subject = subject
        self.title = title
        self.description = description
        self.status = status
        self.drafting_date = drafting_date
        self.deadline = deadline
        
    def __repr__(self) -> str:
        return "<Homework %r>" % self.title