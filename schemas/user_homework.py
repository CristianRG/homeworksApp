from datetime import datetime
from bd import db_instance

class User_Homework(db_instance.Model):
    
    id_user_homework = db_instance.Column(db_instance.String(50), primary_key=True)
    id_user = db_instance.Column(db_instance.String(50), db_instance.ForeignKey('user.id_user'))
    id_homework = db_instance.Column(db_instance.String(50), db_instance.ForeignKey('homework.id_homework'))
    drafting_date = db_instance.Column(db_instance.Date)
    deadline = db_instance.Column(db_instance.Date, nullable=False)
    
    def __init__(self, id_user_homework, id_user, id_homework, drafting_date, deadline):
        self.id_user_homework = id_user_homework
        self.id_user = id_user
        self.id_homework = id_homework
        self.drafting_date = drafting_date
        self.deadline = deadline
        
    def __repr__(self) -> str:
        return "<UserHomework %r>" % self.id_user