// setting current date in invoice
document.getElementById("currentDate").valueAsDate = new Date();


//adding products in row
document.getElementById("productAddSuccessBox").style.display = "none";
document.getElementById("productAddErrorBox").style.display = "none";
var serialNo = 0;
function addProductInRow(){
    var productName = document.getElementById("productName").value;
    var productQuantity = document.getElementById("productQuantity").value;
    var productPrice = document.getElementById("productPrice").value;
    var productDiscount = document.getElementById("productDiscount").value;
    serialNo++;
    if(productName == "" || productQuantity == "" || productPrice == "" || productDiscount == ""){
        document.getElementById("productAddErrorBox").style.display = "block";
        setTimeout(() => {
            document.getElementById("productAddErrorBox").style.display = "none";
        },5000);
    } 
    else{
        var totalAmount = (productPrice * productQuantity) * (1-(productDiscount/100));
        createProductRow(serialNo, productName, productQuantity, productPrice, productDiscount, totalAmount);
        document.getElementById("productName").value = "";
        document.getElementById("productQuantity").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productAddSuccessBox").style.display = "block";
        document.querySelector('[data-bs-dismiss="modal"]').click();
        setTimeout(() => {
            document.getElementById("productAddSuccessBox").style.display = "none";
        },5000);
    }
}

function createProductRow(serialNo, productName, productQuantity, productPrice, productDiscount, totalAmount){
    
}

//calling functions
document.getElementById("addProduct").addEventListener("click", addProductInRow);