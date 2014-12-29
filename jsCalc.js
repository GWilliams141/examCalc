document.getElementById("desired").addEventListener("blur", textChange);
document.getElementById("slider").addEventListener("change", slideChange);
document.getElementById("add").addEventListener("click", addRow);
document.getElementById("remove").addEventListener("click", removeRow);

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
    var rowId = "row" + tableList.length;

    var newRow = document.createElement("tr");

    var newCell1 = document.createElement("td");
    var newCell2 = document.createElement("td");
    var newCell3 = document.createElement("td");

    var newTextbox1 = document.createElement("input");
    //input.name would assign it an id? I think...
    var newTextbox2 = document.createElement("input");
    var newTextbox3 = document.createElement("input");
    // Why can't I use the same percent node for both boxes?
    var percent1 = document.createTextNode("%");
    var percent2 = document.createTextNode("%");

    newCell1.appendChild(newTextbox1);
    newCell2.appendChild(newTextbox2);
    newCell2.appendChild(percent1);
    newCell3.appendChild(newTextbox3);
    newCell3.appendChild(percent2);

    newRow.appendChild(newCell1);
    newRow.appendChild(newCell2);
    newRow.appendChild(newCell3);
    // Assign an id so you can delete it later
    newRow.setAttribute("id", rowId);

    document.getElementById("entries").appendChild(newRow);
}

function removeRow() {
    var tableList = document.getElementsByTagName("tr");
    var idToRemove = "row" + (tableList.length - 1);
    var rowToRemove = document.getElementById(idToRemove);
    var table = document.getElementById("entries");
    
    if (idToRemove !== "row1") {
        table.removeChild(rowToRemove);
    } else {
        // Send error or somehow inform user that they can't do this
    }
}
