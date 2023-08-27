document.getElementById("gstIcon").style.display = "none";
document.getElementById("userGST").style.display = "none";
document.getElementById("userCompanyLogoImg").style.display = "none";

function enableGSTInput(){
    document.getElementById("gstIcon").style.display = "inline-block";
    document.getElementById("userGST").style.display = "inline";
    document.getElementById("enableBtn").style.display = "none";
}

function displayLogo(){
    const input = document.getElementById('userCompanyLogo');
    const img = document.getElementById('userCompanyLogoImg');
    const label = document.getElementById('logoLabel');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        img.style.display = "inline";
        input.style.display = "none";
        label.style.display = "none";
        reader.readAsDataURL(input.files[0]);
    }
}

function deleteLogo(){
    document.getElementById("userCompanyLogoImg").style.display = "none";
    document.getElementById("userCompanyLogo").value = "";
    document.getElementById('userCompanyLogo').style.display = "inline";
    document.getElementById('logoLabel').style.display = "inline";
}

document.getElementById("deleteLogo").addEventListener("click", deleteLogo);