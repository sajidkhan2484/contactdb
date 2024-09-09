// script.js

$(document).ready(function () {
    // Dummy login validation
    $('#login-form').on('submit', function (e) {
        e.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        if (username === 'admin' && password === 'password') {
            window.location.href = 'index.html'; // Redirect to main page
        } else {
            $('#login-error').text('Invalid credentials, please try again.');
        }
    });

    // Load contacts when the page loads
    loadContacts();

    // Save Contact
    $('#form-contact').on('submit', function (e) {
        e.preventDefault();
        const contact = {
            ID: $('#contact-id').val(),
            Name: $('#name').val(),
            Phone: $('#phone').val(),
            Address: $('#address').val(),
            Locality: $('#locality').val(),
            FamilyMembers: $('#family-members').val()
        };
        if (contact.ID) {
            updateContact(contact);
        } else {
            createContact(contact);
        }
    });

    // Search contacts
    $('#search').on('keyup', function () {
        const query = $(this).val().toLowerCase();
        $('#contacts-table tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(query) > -1);
        });
    });
});

// Dummy function to load contacts - Replace this with SharePoint integration
function loadContacts() {
    // Use SharePoint REST API to fetch data
    $.ajax({
        url: '<SharePoint-Site-URL>/_api/web/lists/getbytitle(\'Contacts\')/items',
        method: 'GET',
        headers: {
            'Accept': 'application/json;odata=verbose'
        },
        success: function (data) {
            // Render contacts
            const items = data.d.results;
            $('#contacts-table').empty();
            items.forEach(item => {
                $('#contacts-table').append(
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
            console.log('Error fetching contacts', error);
        }
    });
}

// Dummy functions for create, update, delete contacts - Replace these with SharePoint CRUD operations
function createContact(contact) {
    // Use SharePoint REST API POST request to create item
    alert('Creating contact...');
}

function updateContact(contact) {
    // Use SharePoint REST API MERGE request to update item
    alert('Updating contact...');
}

function deleteContact(id) {
    // Use SharePoint REST API DELETE request to remove item
    alert('Deleting contact...');
}

function editContact(id) {
    // Load contact details into form for editing
    alert('Editing contact...');
}
