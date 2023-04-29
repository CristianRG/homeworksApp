from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

app = Flask(__name__)
# al usar una configuracion no es necesario importar el modulo, pero es importante poner el nombre del modulo seguido de la clase con la configuracion
app.config.from_object('config.DevelopmentConfig')
app.config['SECRET_KEY'] = '0641e8aa-89e5-7f43-8000-63ea72d73cfb'

login_manager_app = LoginManager()

# importamos las rutas

from routes.routes import *
