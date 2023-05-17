from app import app
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from os import environ

load_dotenv()

# obtenemos los valores de las variables de entorno
DB_USER = environ.get('DB_USER')
DB_PASS = environ.get("DB_PASSWORD")
DB_HOST = environ.get('DB_HOST')
DB_NAME = environ.get('DB_NAME')
DB_SSL_CER = environ.get("DB_SSL_CER")
DB_SSL_KEY = environ.get("DB_SSL_KEY")

# configuramos la aplicación para que sea capaz de conectarse a la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{DB_USER}:{DB_PASS}@{DB_HOST}:3306/{DB_NAME}?ssl_cert=/{DB_SSL_CER}&ssl_key=/{DB_SSL_KEY}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# realizamos la instancia
db_instance = SQLAlchemy(app=app)

