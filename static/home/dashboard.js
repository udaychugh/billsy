// setting current date in invoice
document.getElementById("currentDate").valueAsDate = new Date();

window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "Are you sure you want to leave this page?";
    e.returnValue = confirmationMessage; 
    return confirmationMessage;
});

//selecting invoice div
const invoiceDiv = document.querySelector(".invoiceMakingDiv");

//adding products in row
document.getElementById("productAddSuccessBox").style.display = "none";
document.getElementById("productAddErrorBox").style.display = "none";
var serialNo = 0;
var subTotal = 0;
var gstValue = document.getElementById("gstValue");
var grandTotal = 0;

document.querySelector("#invoiceEditBtns").classList.add("d-none");

function createNewInvoice(){
    document.querySelector(".invoiceMakingDiv").style.display = "block";
    document.querySelector("#invoiceEditBtns").classList.remove("d-none");
    document.querySelector("#invoiceEditBtns").classList.add("d-flex");
    document.querySelector("#invoiceCreateBtn").classList.toggle("d-none");
    checkForGstInput();
}

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
        },3000);
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
        },3000);
    }
}

function createProductRow(serialNo, productName, productQuantity, productPrice, productDiscount, totalAmount){
    var addTable = document.getElementById("upperTable");
    var addNewRow = document.createElement("tr");
    subTotal = subTotal + totalAmount;
    grandTotal = subTotal * (1+(gstValue.value/100));
    subTotal = subTotal.toFixed(2);
    document.getElementById("subTotalAmount").innerHTML = subTotal;
    document.getElementById("grandTotalValue").innerHTML = grandTotal;
    addNewRow.innerHTML = `
        <td>${serialNo}</td>
        <td>${productName}</td>
        <td>${productQuantity}</td>
        <td>${productPrice}</td>
        <td>${productDiscount}</td>
        <td>${parseFloat(totalAmount).toFixed(2)}</td>
    `;
    addTable.appendChild(addNewRow);
}

function validateGrandTotalAmount(){
    grandTotal = subTotal * (1+(gstValue.value/100));
    grandTotal = grandTotal.toFixed(2);
    document.getElementById("grandTotalValue").innerHTML = grandTotal;
}

function downloadPdf(){
    printout("#toprintthis", {
        pageTitle: window.document.title,
        importCSS: true,
        autoPrint: true,
        autoPrintDelay: 1000,
        header: null,
        footer: null,
        closeAfterPrint: close,
    });
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

function checkForGstInput(){
    var userGstInput = document.getElementById("userGstValue").textContent;
    if (userGstInput == "GST :  "){
        document.getElementById("userGstValue").innerHTML = "GST : Exempted";
        document.getElementById("userGstValue").title = "if you want to add gst number than go to Edit my business info and check for i have gst number in form."
    }
}

//adding shortcut keys here
document.addEventListener("keydown", function(event) {
    //add new row
    if(event.altKey && event.key == "n"){
        document.getElementById("openAddNewRowModal").click();
    }
});

//calling functions
document.getElementById("addProduct").addEventListener("click", addProductInRow);
document.getElementById("gstValue").addEventListener("change", validateGrandTotalAmount);
document.getElementById("printInvoice").addEventListener("click", downloadPdf);
document.getElementById("deleteLogo").addEventListener("click", deleteLogo);