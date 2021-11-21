var selectedRow = null;

function create() {
        var data = readFormData();

        if (selectedRow == null) {
            insert(data);
            getPlace();
        } else {
            update(data);
        }

        resetForm();
}

function readFormData() {
    var data = {};
    data["firstName"] = document.getElementById("firstName").value;
    data["lastName"] = document.getElementById("lastName").value;
    data["preferredName"] = document.getElementById("preferredName").value;
    data["phoneNumber"] = document.getElementById("phoneNumber").value;
    data["zip"] = document.getElementById("zip").value;
    data["city"] = document.getElementById("city").value;
    data["state"] = document.getElementById("state").value;
    data["favoriteHobby"] = document.getElementById("favoriteHobby").value;
    return data;
}

function insert(data) {
    var table = document.getElementById("list").getElementsByTagName('tbody')[0];
    var row = table.insertRow(table.length);
    cell1 = row.insertCell(0);
    cell1.innerHTML = data.firstName;
    cell2 = row.insertCell(1)
    cell2.innerHTML = data.lastName;
    cell3 = row.insertCell(2)
    cell3.innerHTML = data.preferredName;
    cell4 = row.insertCell(3)
    cell4.innerHTML = data.phoneNumber;
    cell5 = row.insertCell(4)
    cell5.innerHTML = data.zip;
    cell6 = row.insertCell(5)
    cell6.innerHTML = data.city;
    cell7 = row.insertCell(6)
    cell7.innerHTML = data.state;
    cell8 = row.insertCell(7)
    cell8.innerHTML = data.favoriteHobby;
    cell9 = row.insertCell(8);
    cell9.innerHTML = '<a onClick="edit(this)">Update</a> <a onClick="deleteRow(this)">Delete</a>'
}

function resetForm() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("preferredName").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("zip").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("favoriteHobby").value = "";
}

function edit(td) {
    selectedRow = td.parentElement.parentElement;

    document.getElementById("firstName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lastName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("preferredName").value = selectedRow.cells[2].innerHTML;
    document.getElementById("phoneNumber").value = selectedRow.cells[3].innerHTML;
    document.getElementById("zip").value = selectedRow.cells[4].innerHTML;
    document.getElementById("city").value = selectedRow.cells[5].innerHTML;
    document.getElementById("state").value = selectedRow.cells[6].innerHTML;
    document.getElementById("favoriteHobby").value = selectedRow.cells[7].innerHTML;
}

function update(data) {
    selectedRow.cells[0].innerHTML = data.firstName;
    selectedRow.cells[1].innerHTML = data.lastName;
    selectedRow.cells[2].innerHTML = data.preferredName;
    selectedRow.cells[3].innerHTML = data.phoneNumber;
    selectedRow.cells[4].innerHTML = data.zip;
    selectedRow.cells[5].innerHTML = data.city;
    selectedRow.cells[6].innerHTML = data.state;
    selectedRow.cells[7].innerHTML = data.favoriteHobby;
}

function deleteRow(td) {
        row = td.parentElement.parentElement;
        document.getElementById("list").deleteRow(row.rowIndex);
        resetForm();
}

function zipBlurFunction() {
    getPlace();
}

function getPlace() {
    var zip = document.getElementById("zip").value;
    console.log("zip:"+zip);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            console.log("result:"+result);
            var place = result.split(', ');
            if (document.getElementById("city").value == "")
                document.getElementById("city").value = place[0];
            if (document.getElementById("state").value == "")
                document.getElementById("state").value = place[1];
        }
    }
    xhr.open("GET", "cityState.php?zip=" + zip);
    xhr.send(null);
}