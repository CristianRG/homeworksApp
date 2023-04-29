from schemas.user_homework import User_Homework
from bd import db_instance
from flask_login import UserMixin

class User(db_instance.Model, UserMixin):
    
    id_user = db_instance.Column(db_instance.String(50), primary_key = True)
    username = db_instance.Column(db_instance.String(25), unique = True, nullable = False)
    password = db_instance.Column(db_instance.String(25), nullable = False)
    user_homework = db_instance.relationship('User_Homework')
    
    
    def __init__(self, id_user, username, password):
        self.id_user = id_user
        self.username = username
        self.password = password
    
#     # creamos una representación de nuestra base de datos, esto hará que sea posible tratar como objetos lo que se especifique
    
    def __repr__(self):
        return "<User %r>" % self.username
    
    def get_id(self):
        return self.id_user

    