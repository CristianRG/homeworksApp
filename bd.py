from app import app
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from os import environ

load_dotenv()

# obtenemos los valores de las variables de entorno
DB_USER = environ.get('DB_USER')
DB_HOST = environ.get('DB_HOST')
DB_NAME = environ.get('DB_NAME')

# configuramos la aplicación para que sea capaz de conectarse a la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://{}:@{}/{}".format(DB_USER, DB_HOST, DB_NAME)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# realizamos la instancia
db_instance = SQLAlchemy(app=app)

