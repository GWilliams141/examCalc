document.getElementById("desired").addEventListener("blur", textChange);
document.getElementById("slider").addEventListener("input", slideChange);
document.getElementById("add").addEventListener("click", addRow);
document.getElementById("remove").addEventListener("click", removeRow);
document.getElementById("calculate").addEventListener("click", tryCalculate);
document.getElementById("units").addEventListener("change", unitChange);

var scored = false;

function textChange() {
    var newDog = document.getElementById("desired").value;
    document.getElementById("slider").value = newDog;
}

function slideChange() {
    var newDog = document.getElementById("slider").value;
    document.getElementById("desired").value = newDog;

    if (scored) {
        if(filledOutCorrectly()) {
            calculate();
        } else {
            
    }
}

function addRow() {
    var newRow;

    var tableList = document.getElementsByTagName("tr");
    var rowId = "row" + tableList.length;

    if (document.getElementById("units").value === "Percentage") {
        newRow = createNewPercentageRow(rowId);
    } else {
        newRow = createNewPointsRow(rowId);
    }

    document.getElementById("entries").appendChild(newRow);
}

function createNewPercentageRow(rowId) {
    var newRow = document.createElement("tr");
    var newCell1 = document.createElement("td");
    var newCell2 = document.createElement("td");
    var newCell3 = document.createElement("td");
    var newTextbox1 = document.createElement("input");
    var newTextbox2 = document.createElement("input");
    var newTextbox3 = document.createElement("input");
    var percent1 = document.createTextNode(" %");
    var percent2 = document.createTextNode(" %");

    newTextbox1.setAttribute("class", "col1");
    newTextbox2.setAttribute("class", "col2");
    newTextbox3.setAttribute("class", "col3");

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

    return newRow;
}

function createNewPointsRow(rowId) {
    var newRow = document.createElement("tr");
    var newCell1 = document.createElement("td");
    var newCell2 = document.createElement("td");
    var newCell3 = document.createElement("td");
    var newTextbox1 = document.createElement("input");
    var newTextbox2 = document.createElement("input");
    var newTextbox3 = document.createElement("input");
    var newTextbox4 = document.createElement("input");
    var percent = document.createTextNode(" %");
    var slash = document.createTextNode(" / ");

    newTextbox1.setAttribute("class", "col1");
    newTextbox2.setAttribute("class", "col2");
    
    newCell1.appendChild(newTextbox1);
    newCell2.appendChild(newTextbox2);
    newCell2.appendChild(percent);
    newCell3.appendChild(newTextbox3);
    newCell3.appendChild(slash);
    newCell3.appendChild(newTextbox4);

    newTextbox3.style["width"] = "65px";
    newTextbox4.style["width"] = "65px";
    
    newRow.appendChild(newCell1);
    newRow.appendChild(newCell2);
    newRow.appendChild(newCell3);

    // Assign an id so you can delete it later
    newRow.setAttribute("id", rowId);

    return newRow;
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

function filledOutCorrectly() {
    var cells;
    var weight;
    var worth;

    cells = document.getElementsByTagName("td");
    for (i = 1; i < cells.length - 1; i += 3) {
        // Check weight
        weight = cells[i].childNodes[0].value;
        if(!weight.match(/\S/) || isNaN(weight)) { // try with just NaN
            // Still haven't checked for incorrect values
            return false;
        }

        // Check worth
        worth = cells[i + 1].childNodes[0].value;
        if(!worth.match(/\S/) || isNaN(worth)) {
            // Still haven't checked for incorrect values
            return false;
        }
    }

    return true;
}

function tryCalculate() {
    if (filledOutCorrectly()) {
        calculate();
    } else {
        alert("Make sure all necessary textboxes are filled out and that they have the correct types of input");
    }
}

function calculate() {
    var weights;
    var scores;
    var needed;
    var wanted;
    var woFinal; // Percentage without final
    var finalWorth;
    var cells; // Does this need to be at top if it's only used in for loop?

    var tableList = document.getElementsByTagName("tr");
    var numRows = tableList.length - 1; // This includes blank rows, should
                                        // change
    
    weights = [];
    scores = [];
    woFinal = 0;
    finalWorth = 100;
    wanted = document.getElementById("desired").value;
    cells = document.getElementsByTagName("td");

    for (i = 0; i < numRows; ++i) {
        weights[i] = cells[(i * 3) + 1].childNodes[0].value;
        scores[i] = cells[(i * 3) + 2].childNodes[0].value;
        woFinal += (weights[i]) * (scores[i]/100);
        finalWorth -= weights[i];
    }

    // Might want to split this up into a couple of lines
    needed = ((-((woFinal - wanted)/finalWorth)) * 100);
    needed = Math.ceil(needed * 100)/100;

    document.getElementById("needed").innerHTML = needed + "%";
    document.getElementById("wanted").innerHTML = wanted;

    scored = true;
}

function unitChange() {
    if (document.getElementById("units").value === "Points") {
        toPoints();
    } else {
        toPercentage();
    }
}

function toPoints() {
    var rowId;
    var parentRow;
    var childData;
    var newData;
    var newTextbox1, newTextbox2, finalWorth;
    var paraText1, paraText2, slash;
    var newPara;

    var tableList = document.getElementsByTagName("tr");
    var numRows = tableList.length - 1;
    var cells = document.getElementsByTagName("td");

    // First create the final worth textbox above the table
    paraText = document.createTextNode("Final Exam is worth ");
    paraText2 = document.createTextNode(" points");
    finalWorth = document.createElement("input");
    newPara = document.createElement("p");
    
    newPara.appendChild(paraText);
    newPara.appendChild(finalWorth);
    newPara.appendChild(paraText2);
    newPara.setAttribute("id", "final_worth");
    document.getElementById("set_up").appendChild(newPara);

    for (i = 0; i < numRows; ++i) {
        // Must define these within so that we can use for each new cell
        newTextbox1 = document.createElement("input");
        newTextbox2 = document.createElement("input");
        slash = document.createTextNode(" / ");


        rowId = "row" + (i + 1);
        parentRow = document.getElementById(rowId);
        childData = cells[(i * 3) + 2];

        newData = document.createElement("td");
        newData.appendChild(newTextbox1);
        newData.appendChild(slash);
        newData.appendChild(newTextbox2);

        newTextbox1.setAttribute("class", "col_point");
        newTextbox2.setAttribute("class", "col_point");

        parentRow.replaceChild(newData, childData);
    }
}

function toPercentage() {
    var rowId;
    var newTextbox;
    var percent;
    var newData;

    var tableList = document.getElementsByTagName("tr");
    var numRows = tableList.length - 1;
    var cells = document.getElementsByTagName("td");

    for (i = 0; i < numRows; ++i) {
        newTextbox = document.createElement("input");
        newTextbox.setAttribute("class", "col3");
        percent = document.createTextNode("%");

        rowId = "row" + (i + 1);
        parentRow = document.getElementById(rowId);
        childData = cells[(i * 3) + 2];

        newData = document.createElement("td");
        newData.appendChild(newTextbox);
        newData.appendChild(percent);

        parentRow.replaceChild(newData, childData);
    }

    // Now remove final worth points line
    document.getElementById("set_up").removeChild(
            document.getElementById("final_worth"));
}
