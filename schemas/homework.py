from schemas.user_homework import User_Homework
from bd import db_instance

class Homework(db_instance.Model):
    
    id_homework = db_instance.Column(db_instance.String(50), primary_key=True)
    subject = db_instance.Column(db_instance.String(20), nullable=False)
    title = db_instance.Column(db_instance.String(30), nullable=False)
    description = db_instance.Column(db_instance.String(200))
    status = db_instance.Column(db_instance.Boolean(), nullable=False)
    user_homework = db_instance.relationship('User_Homework')
    
    def __init__(self, id_homework, subject, title, description, status):
        self.id_homework = id_homework
        self.subject = subject
        self.title = title
        self.description = description
        self.status = status
        
    def __repr__(self) -> str:
        return "<Homework %r>" % self.title