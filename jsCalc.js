document.getElementById("desired").addEventListener("blur", textChange);
document.getElementById("slider").addEventListener("change", slideChange);
document.getElementById("add").addEventListener("click", addRow);

function textChange() {
    var newDog = document.getElementById("desired").value;
    document.getElementById("slider").value = newDog;
}

function slideChange() {
    var newDog = document.getElementById("slider").value;
    document.getElementById("desired").value = newDog;
}

function addRow() {
    var tableList = document.getElementsByTagName("tr");
    var numRows = tableList.length - 1;
    console.log("number of rows: " + numRows);
}
