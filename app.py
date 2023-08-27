from flask import Flask, render_template, request, redirect, url_for, session, make_response, send_file
import sqlite3
import pdfkit

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
    if "logedin" in session and session["logedin"]:
        return redirect(url_for('dashboard'))
    return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():   
    if "logedin" in session and session["logedin"]:
        return redirect(url_for('dashboard'))                     
    if request.method == "POST":
        firstName = request.form['userFirstName']
        lastName = request.form['userlastName']
        email = request.form['signupEmail']
        password = request.form['signupPassword']

        with sqlite3.connect(DATABASE) as con:
            cur = con.cursor()
            cur.execute('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', (firstName, lastName, email, password))
            con.commit()
        isUserLoggedIn = 1
        return redirect(url_for('dashboard'))
    return render_template('preauth/signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if "logedin" in session and session["logedin"]:
        return redirect(url_for('dashboard'))
    
    msg = ''
    if request.method == "POST":
        email = request.form['loginEmail']
        password = request.form['loginPassword']

        if (authenticate_user(email, password)):
            return redirect(url_for('dashboard'))
        else:
            error_msg = 'Invalid credentials entered. Please try again.'
    return render_template('preauth/login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

@app.route('/dashboard')
def dashboard():
    if "logedin" in session and session["logedin"]:
        return render_template('home/dashboard.html')
    else:
        return redirect(url_for('login'))
    
@app.route('/user_info')
def user_info():
    return render_template('preauth/user_info.html')
    
@app.route('/my_products')
def my_products():
    return render_template('home/my_products.html')
    
@app.route('/downloadPdf', methods=['POST'])
def downloadPdf():
    html_content = """
    <html>
    <head>
        <style>
            /* Your CSS styles for the specific div */
        </style>
    </head>
    <body>
        <div id="your-div">
            <!-- Your content here -->
        </div>
    </body>
    </html>
    """
    generatedPdf = pdfkit.from_string(html_content, False)
    response = make_response(generatedPdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=output.pdf'
    return response

if __name__ == '__main__':
    app.run(debug=True)