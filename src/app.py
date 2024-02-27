"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db,User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager,create_access_token, get_jwt_identity, jwt_required
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import timedelta

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
CORS(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
    app.config['JWT_SECRET_KEY']= "SUPER-CLAVE_SECRETA"
    app.config['SECRET_KEY']= "PALABRA_SECRETA"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
expire_jwt= timedelta(minutes=10)

@app.route('/user', methods=['POST'])
def create_user():
  get_from_body = request.json.get("email")
  user = User() 
  user_exist = User.query.filter_by(email=get_from_body).first()
  if user_exist is not None:
    return jsonify({"error": "The User already exist"}), 409
  else:
    user.email=request.json.get("email")
    password=  request.json.get("password")
    passwordHash= bcrypt.generate_password_hash(password).decode("utf-8")
    print(passwordHash)
    user.password = passwordHash
    db.session.add(user)
    db.session.commit()

    return jsonify({
      "msg": "The user was created",
      "status": "success"
    }), 201

    #Login

@app.route('/login', methods=['POST'])
def login():
  print(request.get_json())
  user= request.json.get("email")
  password= request.json.get("password")

  user_exist = User.query.filter_by(email= user).first()
  print(user_exist.password)
  if user_exist is not None:
    if bcrypt.check_password_hash(user_exist.password, password):
        token= create_access_token(identity= user, expires_delta= expire_jwt)

        return jsonify({
          "token": token,
          "status": "success",
          "user": user_exist.serialize()
        }), 200
    else: 
       return jsonify({"error": "Incorrect password"}), 400
  else:
       return jsonify({"error": "User doesn't exist"}), 401

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=False)
