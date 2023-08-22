import datetime
from utils.convertToJson import convertToJsonHomework, convertToJsonUsers

from flask import render_template, request, redirect, url_for, jsonify, flash
from app import app, login_manager_app
from schemas.user import User
from schemas.homework import Homework
from bd import db_instance
from flask_login import login_required, login_user, current_user, logout_user
from utils.uuid_generate import generateUUID
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


# configuramos nuevamente la aplicación para que pueda conctarse a la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{DB_USER}:{DB_PASS}@{DB_HOST}:3306/{DB_NAME}?ssl_cert=/{DB_SSL_CER}&ssl_key=/{DB_SSL_KEY}"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# loggin manager es un modulo de flask_login, aqui podemos registrar un usuario sí es que cumple con cierto criterio, para esto
# se hace uso de un id. Se retorna un objecto con los datos del usuario
@login_manager_app.user_loader
def load_user(id):
    """This sets the callback for reloading a user from the session. The function you set should take a user ID (a str) and return a user object, 
    or None if the user does not exist. https://flask-login.readthedocs.io/en/latest/#flask_login.LoginManager.user_loader"""
    if(User.query.filter(User.id_user == id).first()):
        query = User.query.filter(User.id_user == id).first()
        return User(query.id_user, query.username ,query.password)
    return None

# ruta principal, redirecciona al usuario a la pagina principal
@app.route('/')
def index():
    return redirect(url_for('home'))

# ruta principal, es necesario estar loggeado para poder entrar en esta pagina
@app.route('/home/', methods = ['POST', 'GET'])
@login_required
def home():
    id_task = generateUUID()
    homework = Homework(id_task, current_user.id_user, "mate", "simon", "efe", False, datetime.date.today(), datetime.date.today())
    db_instance.session.add(homework)
        
    db_instance.session.commit()
    return render_template('index.html', today=datetime.date.today())

# ruta para loggear a un usuario
@app.route('/login/', methods=['POST', 'GET'])
def login():
    
    if request.method == 'POST':    
        username = request.form['username']
        password = request.form['password']
        query = User.query.filter(User.username == username).first()
        
        try:
            if query.password == password:
                user = User(query.id_user, query.username, query.password)
                login_user(user)
                return redirect(url_for('home'))
        except (AttributeError):
            flash('Usuario o contraseña incorrectos. Intenta nuevamente.')
    
    return render_template('login.html')


# ruta de registro, es capaz de registrar un usuario siempre que cumpla con determinadas caracteristicas
@app.route('/register/', methods=['POST', 'GET'])
def register():
    
    if request.method == "POST":   
        username = request.form['username']
        password = request.form['password']
        
        query = db_instance.session.query(User).filter(User.username == username)
        
        try:
            if query.username:
                flash("El usuario ya existe")
                return render_template("register.html")
            
        except AttributeError as e:
            pass
            
        if (username.isspace() == False and len(username) >= 6 and len(password) >= 8 and password.isspace() == False):
                id_user = generateUUID()
                new_user = User(id_user, username, password)
                db_instance.session.add(new_user)
                db_instance.session.commit()
                flash('Registrado exitosamente')
                return redirect(url_for('login'))
        else:
            flash('Error en el formulario. Algunos campos fueron llenados incorrectamente.')
            return render_template("register.html")
            
           
    return render_template('register.html')

# --------------------- APIs

@app.get('/api/v1/homeworks/')
def get_homeworks_user():
    
    homeworksToday = db_instance.session.query(Homework).filter(Homework.id_user == current_user.id_user, Homework.deadline == datetime.date.today())
    today = convertToJsonHomework(homeworksToday)
    
    homeworksTomorrow = db_instance.session.query(Homework).filter(Homework.id_user == current_user.id_user, Homework.deadline == datetime.date.today()+datetime.timedelta(days=1))
    tomorrow = convertToJsonHomework(homeworksTomorrow)
    
    homeworksFuture = db_instance.session.query(Homework).filter(Homework.id_user == current_user.id_user, Homework.deadline > datetime.date.today()+datetime.timedelta(days=1))
    future = convertToJsonHomework(homeworksFuture)
    
    homeworksPast = db_instance.session.query(Homework).filter(Homework.id_user == current_user.id_user, Homework.deadline < datetime.date.today())
    past = convertToJsonHomework(homeworksPast)
    
    return jsonify({'today': today, 'tomorrow': tomorrow, "future": future, "past":past})

@app.get("/api/v1/users/")
def get_users():
    
    users = db_instance.session.query(User).all()
    UsersJson = convertToJsonUsers(users)
    
    return jsonify({"users": UsersJson})

@app.get("/api/v1/homework/<string:id>")
def get_homework(id):
    
    query = db_instance.session.query(Homework).filter(Homework.id_homework == id, Homework.id_user == current_user.id_user)
    homework = convertToJsonHomework(query)
        
    return jsonify(homework)

@app.post("/api/v1/homework/<string:id>")
def update_homework(id):
   return "Hey"

# por implementar ... ----------------------------------------------------------

@app.post("/add/")
@login_required
def add_homework():
        
        subject = request.form['subject']
        title = request.form['title']
        description = request.form['description']
        deadline = request.form['deadline']
        id_task = generateUUID()
        homework = Homework(id_task, current_user.id_user, "mate", "simon", "efe", False, datetime.date.today(), datetime.date.today())
        db_instance.session.add(homework)
        
        db_instance.session.commit()
        
        return redirect(url_for('home'))

@app.post('/edit/')
def edit_course():
    id_homework = request.form['id_homework']
    subject = request.form['subject']
    title = request.form['title']
    description = request.form['description']
    deadline = request.form['deadline']
    
    query = tuple(db_instance.session.query(Homework).filter(Homework.id_user == current_user.id_user, Homework.id_homework == id_homework))
    homework = query[0]
    
    homework.subject = subject
    homework.title = title
    homework.description = description
    homework.deadline = deadline
    
    db_instance.session.add(homework)
    db_instance.session.commit()
    
    flash('Updated!')
    return redirect(url_for('home'))

@app.route('/delete/<int:id_note>/')
def delete_note(id_note):
    return "Are you secure that you want delete this note with id same to {}".format(id_note)

@app.route('/details/<int:id_note>/')
def details(id_note):
    return "This is the detais of the note with id same to {}".format(id_note)

@app.route('/logout/')
@login_required
def logout():
    logout_user()
    return "You are logout!"

# errores -----------------------------------

# error that ocurred when a user try into in the app without register before
@app.errorhandler(401)
def user_unauthorized(e):
    return redirect(url_for('login'))
