document.addEventListener('DOMContentLoaded',() =>{
   // Fetch and display books on page load
   fetchBooks();
});

// Fetch and display books
function fetchBooks() {
    fetch('http://localhost:5500/getbooks')
        .then(response => response.json())
        .then(books => {
            const booksContainer = document.getElementById('booksContainer');
            booksContainer.innerHTML = ''; // Clear previous content

            books.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book-item');
                bookDiv.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>Author: ${book.author}</p>
                    <p>Price: $${parseFloat(book.price).toFixed(2)}</p>
                `;
                booksContainer.appendChild(bookDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            const booksContainer = document.getElementById('booksContainer');
            booksContainer.innerHTML = `<p>Error loading books. Please try again later.</p>`;
        });
}