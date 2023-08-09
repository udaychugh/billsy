//hiding eye from password
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('closeEye').style.display = "none";
});

//password toggle function
function passwordToggleOpenEye(){
    document.getElementById('closeEye').style.display = "block";
    document.getElementById('openEye').style.display = "none";
    document.getElementById("loginPassword").type = "text";
}

function passwordToggleCloseEye(){
    document.getElementById('closeEye').style.display = "none";
    document.getElementById('openEye').style.display = "block";
    document.getElementById("loginPassword").type = "password";
}

//calling functions here
document.getElementById("openEye").addEventListener("click", passwordToggleOpenEye);
document.getElementById("closeEye").addEventListener("click", passwordToggleCloseEye);

