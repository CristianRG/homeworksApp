from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from dotenv import load_dotenv
from os import environ

load_dotenv()

# variable para obtener el valor de la llave secreta
SECRECT_KEY = environ.get('SECRECT_KEY')

app = Flask(__name__)
# al usar una configuracion no es necesario importar el modulo, pero es importante poner el nombre del modulo seguido de la clase con la configuracion
app.config.from_object('config.DevelopmentConfig')
app.config['SECRET_KEY'] = SECRECT_KEY

login_manager_app = LoginManager()

# importamos las rutas

from routes.routes import *
