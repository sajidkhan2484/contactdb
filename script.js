// script.js
const clientId = "2310956b-ced0-472b-8794-5f9d029b8573"; // Azure AD Application (client) ID
const tenantId = "8b280b8e-cb5f-4c0b-9eda-f69bf4b498bc"; // Azure AD Tenant ID
const clientSecret = "4o_8Q~HVFzTdVNJ0VeOaZ.WECq2BQEvFBUxpnbbu"; // Secret created in Azure AD
const siteUrl = "https://itechsolution.sharepoint.com/sites/PakizaMasjid"; // SharePoint site URL
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

  // Function to get an access token using client credentials
  async function getAccessToken() {
    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        scope: "https://graph.microsoft.com/.default",
        client_secret: clientSecret,
        grant_type: "client_credentials",
      }),
    });

    const data = await response.json();
    return data.access_token;
  }

  // Function to fetch SharePoint data
  async function fetchSharePointData() {
    const accessToken = await getAccessToken();

    // SharePoint REST API endpoint to get list items
    const apiEndpoint = `${siteUrl}/_api/web/lists/getbytitle('contacts')/items`;

    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json;odata=verbose",
      },
    });

    const data = await response.json();
    console.log(data); // Log data or update the UI as needed
  }

  // Load contacts when the page loads
   loadContacts();
  // Call function to fetch SharePoint data
  //fetchSharePointData().catch(console.error);

  // Save Contact
  $("#form-contact").on("submit", function (e) {
    e.preventDefault();
    const contact = {
      ID: $("#contact-id").val(),
      Name: $("#name").val(),
      Phone: $("#phone").val(),
      Address: $("#address").val(),
      Locality: $("#locality").val(),
      FamilyMembers: $("#family-members").val(),
    };
    if (contact.ID) {
      updateContact(contact);
    } else {
      createContact(contact);
    }
  });

  // Search contacts
  $("#search").on("keyup", function () {
    const query = $(this).val().toLowerCase();
    $("#contacts-table tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(query) > -1);
    });
  });
});


function loadContacts() {
    $.getJSON('data.json', function(data) {
        $('#contact-list').empty();
        data.contacts.forEach(function(contact) {
            $('#contact-list').append(`
                <div class="contact">
                    <h3>${contact.name}</h3>
                    <p>${contact.phone}</p>
                    <p>${contact.address}</p>
                    <button class="edit-contact">Edit</button>
                    <button class="delete-contact">Delete</button>
                </div>
            `);
        });
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
