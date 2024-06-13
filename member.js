document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://your-api-url.com/memberships'; 

    
    document.getElementById('membershipForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = document.getElementById('id').value;
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const contact = document.getElementById('contact').value;
        const start = document.getElementById('start').value;
        const end = document.getElementById('end').value;
        const subscription = document.getElementById('subscription').value;

        const data = { name, address, contact, start, end, subscription };

        let method = 'POST';
        let url = apiUrl;
        if (id) {
            method = 'PUT';
            url = `${apiUrl}/${id}`;
        }

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Membership saved successfully');
                document.getElementById('membershipForm').reset();
                loadMemberships();
            } else {
                alert('Error saving membership');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving membership');
        }
    });

    
    document.getElementById('getMemberships').addEventListener('click', loadMemberships);

    async function loadMemberships() {
        try {
            const response = await fetch(apiUrl);
            const memberships = await response.json();

            const list = document.getElementById('membershipList');
            list.innerHTML = '';
            memberships.forEach((membership) => {
                const listItem = document.createElement('li');
                listItem.textContent = `
                    ID: ${membership.id}, 
                    Name: ${membership.name}, 
                    Address: ${membership.address}, 
                    Contact: ${membership.contact}, 
                    Start: ${membership.start}, 
                    End: ${membership.end}, 
                    Subscription: ${membership.subscription}
                `;
                list.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Error retrieving memberships');
        }
    }

    
    document.getElementById('deleteForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = document.getElementById('deleteId').value;
        const url = `${apiUrl}/${id}`;

        try {
            const response = await fetch(url, { method: 'DELETE' });

            if (response.ok) {
                alert('Membership deleted successfully');
                document.getElementById('deleteForm').reset();
                loadMemberships();
            } else {
                alert('Error deleting membership');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting membership');
        }
    });

    
    loadMemberships();
});
