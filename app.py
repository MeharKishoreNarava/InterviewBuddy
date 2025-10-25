# ...existing code...
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# --- 1. CONFIGURATION AND INITIALIZATION ---
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///organization_management.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- 2. DATABASE MODELS ---
class Organization(db.Model):
    __tablename__ = 'organizations'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    address = db.Column(db.String(120))
    users = db.relationship('User', backref='organization', lazy=True)

    def to_dict(self):
        return {'id': self.id, 'name': self.name, 'address': self.address}

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    role = db.Column(db.String(20), default='Standard')
    organization_id = db.Column(db.Integer, db.ForeignKey('organizations.id'), nullable=False)

    def to_dict(self, include_org_name=False):
        data = {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'role': self.role,
            'organizationId': self.organization_id,
        }
        if include_org_name and self.organization:
            data['organizationName'] = self.organization.name
        return data

# --- 3. HELPER FUNCTION (for initial setup/testing) ---
def seed_data():
    with app.app_context():
        db.create_all()
        if not Organization.query.first():
            org1 = Organization(name='Tech Solutions Inc.', address='123 Main St')
            org2 = Organization(name='Creative Agency', address='456 Elm St')
            db.session.add_all([org1, org2])
            db.session.commit()
            user1 = User(first_name='Alice', last_name='Smith', email='alice@tech.com', role='Admin', organization_id=org1.id)
            user2 = User(first_name='Bob', last_name='Jones', email='bob@creative.com', role='Standard', organization_id=org2.id)
            db.session.add_all([user1, user2])
            db.session.commit()
            print("Database seeded with sample organizations and users.")

# --- 4. API ROUTES (Users CRUD) ---
@app.route('/api/users', methods=['GET'])
def list_users():
    try:
        users = User.query.all()
        return jsonify([u.to_dict(include_org_name=True) for u in users]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    required = ('firstName', 'lastName', 'email', 'organizationId')
    if not all(k in data for k in required):
        return jsonify({'error': 'Missing required fields'}), 400
    try:
        if Organization.query.get(data['organizationId']) is None:
            return jsonify({'error': 'Organization not found'}), 404
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email already in use'}), 409
        user = User(
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=data['email'],
            role=data.get('role', 'Standard'),
            organization_id=data['organizationId']
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict(include_org_name=True)), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    data = request.get_json() or {}
    try:
        if 'firstName' in data:
            user.first_name = data['firstName']
        if 'lastName' in data:
            user.last_name = data['lastName']
        if 'email' in data:
            if User.query.filter(User.email == data['email'], User.id != user.id).first():
                return jsonify({'error': 'Email already in use'}), 409
            user.email = data['email']
        if 'role' in data:
            user.role = data['role']
        if 'organizationId' in data:
            if Organization.query.get(data['organizationId']) is None:
                return jsonify({'error': 'Organization not found'}), 404
            user.organization_id = data['organizationId']
        db.session.commit()
        return jsonify(user.to_dict(include_org_name=True)), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# --- 5. RUN APPLICATION ---
if __name__ == '__main__':
    seed_data()
    app.run(debug=True)
# ...existing code...