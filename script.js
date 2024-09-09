var dataContacts = [];
$(document).ready(function () {
  // Dummy login validation
  $("#login-form").on("submit", function (e) {
    e.preventDefault();
    const username = $("#username").val();
    const password = $("#password").val();
    if (username === "admin" && password === "password") {
      window.location.href = "index.html"; // Redirect to main page
    } else {
      $("#login-error").text("Invalid credentials, please try again.");
    }
  });

  // Load contacts when the page loads
  // loadContacts();
  // Call function to fetch SharePoint data
  //fetchSharePointData().catch(console.error);
  var table = "";
  $.getJSON("data.json", function (data) {
    dataContacts = data;
    table = $("#contactTable").DataTable({
      data: dataContacts,
      columns: [
        { data: "ContactId" },
        { data: "Name" },
        { data: "Phone" },
        { data: "Address" },
        { data: "Locality" },
        { data: "LastMeeting" },
        { data: "notes" },
        {
          data: null,
          defaultContent: '<button class="edit-btn">Edit</button>',
          orderable: false,
        },
      ],
    });
  });

  // Function to make a row editable
  function makeRowEditable(row) {
    const data = table.row(row).data();
    const rowData = `
        <td><input type="text"  class="edit-input" value="${data.ContactId}" readonly /></td>    
        <td><input type="text" class="edit-input" value="${data.Name}" /></td>
        <td><input type="text" class="edit-input" value="${data.Phone}" /></td>
        <td><input type="text" class="edit-input" value="${data.Address}" /></td>
        <td><input type="text" class="edit-input" value="${data.Locality}" /></td>
        <td><input type="text" class="edit-input" value="${data.LastMeeting}" /></td>
        <td><input type="text" class="edit-input" value="${data.notes}" /></td>
        <td>
            <button class="save-btn">Save</button>
            <button class="cancel-btn">Cancel</button>
        </td>
    `;
    $(row).html(rowData);
  }

  // Event listener for edit button
  $("#contactTable tbody").on("click", ".edit-btn", function () {
    const row = $(this).closest("tr");
    makeRowEditable(row);
  });

  // Event listener for save button
  $("#contactTable tbody").on("click", ".save-btn", function () {
    const row = $(this).closest("tr");
    const inputs = row.find("input");
    const updatedData = {
      Name: inputs.eq(1).val(),
      Phone: inputs.eq(2).val(),
      Address: inputs.eq(3).val(),
      Locality: inputs.eq(4).val(),
      LastMeeting: inputs.eq(5).val(),
      notes: inputs.eq(6).val(),
    };

    // Update the row data in DataTable
    table.row(row).data(updatedData).draw();

    // Optionally, save data to server or JSON file
    console.log("Updated Data:", updatedData);
  });

  // Event listener for cancel button
  $("#contactTable tbody").on("click", ".cancel-btn", function () {
    table.draw();
  });
});

function loadContacts() {
  $.getJSON("data.json", function (data) {
    dataContacts = data;
  });
}

// Dummy function to load contacts - Replace this with SharePoint integration
function loadContacts1() {
  // Use SharePoint REST API to fetch data
  $.ajax({
    url: "<SharePoint-Site-URL>/_api/web/lists/getbytitle('contacts')/items",
    method: "GET",
    headers: {
      Accept: "application/json;odata=verbose",
    },
    success: function (data) {
      // Render contacts
      const items = data.d.results;
      $("#contacts-table").empty();
      items.forEach((item) => {
        $("#contacts-table").append(
          `<tr>
                        <td>${item.Name}</td>
                        <td>${item.Phone}</td>
                        <td>${item.Address}</td>
                        <td>${item.Locality}</td>
                        <td>
                            <button onclick="editContact(${item.ID})">Edit</button>
                            <button onclick="deleteContact(${item.ID})">Delete</button>
                        </td>
                    </tr>`
        );
      });
    },
    error: function (error) {
      console.log("Error fetching contacts", error);
    },
  });
}

// Dummy functions for create, update, delete contacts - Replace these with SharePoint CRUD operations
function createContact(contact) {
  // Use SharePoint REST API POST request to create item
  alert("Creating contact...");
}

function updateContact(contact) {
  // Use SharePoint REST API MERGE request to update item
  alert("Updating contact...");
}

function deleteContact(id) {
  // Use SharePoint REST API DELETE request to remove item
  alert("Deleting contact...");
}

function editContact(id) {
  // Load contact details into form for editing
  alert("Editing contact...");
}
