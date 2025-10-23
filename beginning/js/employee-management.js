/*eslint-env browser*/
var $ = function (id) {
    "use strict";
    return document.getElementById(id);
};

// Employee array
let employees = [
    { name: "Zak Ruvalcaba", title: "Software Engineer", extension: "1234" },
    { name: "Sally Smith", title: "Project Manager", extension: "2345" },
    { name: "Fred Franklin", title: "Quality Analyst", extension: "3456" },
    { name: "John Smith", title: "System Administrator", extension: "4567" },
    { name: "Jane Caruthers", title: "Product Owner", extension: "5678" }
];

// Initialize event listeners and display employees on page load
window.addEventListener("load", function () {
    "use strict";

    $("add_employee").addEventListener("click", addEmployee);
    
    // Display initial employees
    displayEmployees();
});

// Function to display employees in the table
function displayEmployees() {
    "use strict";
    var employeeTable = $("employee_table");
    var employeeCount = employees.length;
    
    // Update the header with employee count
    $("employee_header").innerHTML = `Showing ${employeeCount} Employees`;
    
    // Clear existing table content
    employeeTable.innerHTML = "";

    // Create table header
    var headerRow = employeeTable.insertRow();
    ["Name", "Title", "Extension", ""].forEach(headerText => {
        var th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    // Add employees to table
    employees.forEach((employee, index) => {
        var row = employeeTable.insertRow();
        Object.values(employee).forEach(text => {
            var cell = row.insertCell();
            cell.textContent = text;
        });
        
        // Add delete button cell
        const deleteCell = row.insertCell();
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteEmployee(index);
        deleteCell.appendChild(deleteButton);
    });
}

// Function to add a new employee
function addEmployee() {
    "use strict";
    var name = $("name").value;
    var title = $("title").value;
    var extension = $("extension").value;
    var msg = "Please review your entries and complete all required fields";
    var required = "<span>Required field</span>";
    var employeeCount = employees.length;
    var header = "";
    
    // Validate inputs
    if (name === "") {
        name = required;
        header = msg;
    }
    if (title === "") {
        title = required;
        header = msg;
    }
    if (extension === "") {
        extension = required;
        header = msg;
    }
        
    if (header === msg) {
        $("employee_header").innerHTML = header;
        return;
    } else {
        $("employee_header").innerHTML = `Showing ${employeeCount} Employees`;
    }

    // Add new employee to the array
    employees.push({ name, title, extension });

    // Clear input fields
    $("name").value = "";
    $("title").value = "";
    $("extension").value = "";
    
    // Refresh display
    displayEmployees();
}

// Function to delete an employee
function deleteEmployee(index) {
    "use strict";
    employees.splice(index, 1);
    displayEmployees();
}