from app import app, login_manager_app
from bd import db_instance

with app.app_context():
    db_instance.create_all()
    login_manager_app.init_app(app)
    

if __name__ == "__main__":
    app.run(debug=True)