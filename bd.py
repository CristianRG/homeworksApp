from app import app
from flask_sqlalchemy import SQLAlchemy

# configuramos la aplicación para que sea capaz de conectarse a la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:@localhost/project"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# realizamos la instancia
db_instance = SQLAlchemy(app=app)

