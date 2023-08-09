from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3

app = Flask(__name__)
app.secret_key = "mykey123"

# SQLite database configuration
DATABASE = 'database.db'

def authenticate_user(email, password):
    with sqlite3.connect(DATABASE) as con:
        cur = con.cursor()
        cur.execute('SELECT * FROM users WHERE email=? AND password=?', (email, password))
        user = cur.fetchall()
        session["logedin"] = True
        session["email"] = email
        return user

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == "POST":
        firstName = request.form['userFirstName']
        lastName = request.form['userlastName']
        email = request.form['signupEmail']
        password = request.form['signupPassword']

        with sqlite3.connect(DATABASE) as con:
            cur = con.cursor()
            cur.execute('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', (firstName, lastName, email, password))
            con.commit()
        
        return redirect(url_for('dashboard'))
    return render_template('preauth/signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    msg = ''
    if request.method == "POST":
        email = request.form['loginEmail']
        password = request.form['loginPassword']

        if (authenticate_user(email, password)):
            return redirect(url_for('dashboard'))
        else:
            error_msg = 'Invalid credentials entered. Please try again.'
    return render_template('preauth/login.html')


@app.route('/dashboard')
def dashboard():
    return render_template('home/dashboard.html')

if __name__ == '__main__':
    app.run(debug=True)