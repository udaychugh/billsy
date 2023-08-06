//hiding eye from password
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('closeEye').style.display = "none";
});

//validating login form details
function validateLoginForm(){
    var userEmail = document.getElementById("loginEmail").value;
    var userPassword = document.getElementById("loginpassword").value;

    if(userEmail == 'udaychugh@yahoo.com' && userPassword == 'udaychugh'){
        return true;
    }

    return false;

}

//password toggle function
function passwordToggleOpenEye(){
    document.getElementById('closeEye').style.display = "block";
    document.getElementById('openEye').style.display = "none";
    document.getElementById("loginpassword").type = "text";
}

function passwordToggleCloseEye(){
    document.getElementById('closeEye').style.display = "none";
    document.getElementById('openEye').style.display = "block";
    document.getElementById("loginpassword").type = "password";
}

//calling functions here
document.getElementById("loginBtn").addEventListener("submit", validateLoginForm);
document.getElementById("openEye").addEventListener("click", passwordToggleOpenEye);
document.getElementById("closeEye").addEventListener("click", passwordToggleCloseEye);

