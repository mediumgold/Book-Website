document.addEventListener('DOMContentLoaded', () => {

    // Handle form submission
    const addBookForm = document.getElementById('BookForm');
    addBookForm.addEventListener('submit', event => {
        event.preventDefault(); // Prevent default form submission

        const title = document.getElementById('booktitle').value;
        const author = document.getElementById('author').value;
        const price = document.getElementById('price').value;

        fetch('http://localhost:5500/add-book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, price }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    fetchBooks(); // Reload books after successful submission
                } else {
                    alert('Failed to add book: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                alert('An error occurred. Please try again.');
            });
    });
});


