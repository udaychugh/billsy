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
        session['email'] = email
        session['first_name'] = firstName
        session['last_name'] = lastName

        with sqlite3.connect(DATABASE) as con:
            cur = con.cursor()
            cur.execute('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', (firstName, lastName, email, password))
            con.commit()
        return redirect(url_for('user_info'))
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
        userDetails = getUserInfo()
        return render_template('home/dashboard.html', userDetails = userDetails)
    else:
        return redirect(url_for('login'))
    
def getUserId():
    email = session['email']
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
    user_id = cursor.fetchone()

    conn.close()
    return user_id
    
@app.route('/user_info', methods=["GET", "POST"])
def user_info():
    if request.method == "POST":
        companyName = request.form['userCompanyName']
        addressLine1 = request.form['userAddresLine1']
        addressLine2 = request.form['userAddresLine2']
        state = request.form['userState']
        phone = request.form['userPhoneName']
        website = request.form['userWebsite']
        gst = request.form['userGST']
        user_id = getUserId()
        session["logedin"] = True
        with sqlite3.connect(DATABASE) as con:
            cur = con.cursor()
            cur.execute('INSERT INTO user_details (user_id, company_name, address_line1, address_line2, state, phone, wesbite, gst) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', (user_id[0], companyName, addressLine1, addressLine2, state, phone, website, gst))
            con.commit()
        return redirect(url_for('dashboard'))
    return render_template('preauth/user_info.html')
    
@app.route('/my_products')
def my_products():
    return render_template('home/my_products.html')
    
def getUserInfo():
    currentUserEmail = session["email"]
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE email = ?", (currentUserEmail,))
    currentUserId = cursor.fetchone()
    currentUserId = currentUserId[0]
    cursor.execute("SELECT * FROM user_details WHERE user_id = ?", (currentUserId,))
    userDetails = cursor.fetchone()
    if userDetails:
        return userDetails

if __name__ == '__main__':
    app.run(debug=True)