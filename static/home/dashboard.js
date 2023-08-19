// setting current date in invoice
document.getElementById("currentDate").valueAsDate = new Date();

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
    document.getElementById("subTotalAmount").innerHTML = subTotal;
    document.getElementById("grandTotalValue").innerHTML = grandTotal;
    addNewRow.innerHTML = `
        <td>${serialNo}</td>
        <td>${productName}</td>
        <td>${productQuantity}</td>
        <td>${productPrice}</td>
        <td>${productDiscount}</td>
        <td>${totalAmount}</td>
    `;
    addTable.appendChild(addNewRow);
}

function validateGrandTotalAmount(){
    grandTotal = subTotal * (1+(gstValue.value/100));
    document.getElementById("grandTotalValue").innerHTML = grandTotal;
}

function printInvoice(){
    var printContent = document.querySelector(".invoiceMakingDiv").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContent;

    window.print();

    document.body.innerHTML = originalContents;
}

//calling functions
document.getElementById("addProduct").addEventListener("click", addProductInRow);
document.getElementById("gstValue").addEventListener("change", validateGrandTotalAmount);
document.getElementById("printInvoice").addEventListener("click", printInvoice);