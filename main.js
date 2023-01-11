document.querySelector('.date').innerHTML = new Date();

window.onload = () => {
  document.getElementById('addNewBook').style.display = 'none';
  document.getElementById('contact').style.display = 'none';
};
document.getElementById('listMenu').addEventListener('click', () => {
  document.getElementById('bookList').style.display = '';
  document.getElementById('addNewBook').style.display = 'none';
  document.getElementById('contact').style.display = 'none';
});
document.getElementById('addBookMenu').addEventListener('click', () => {
  document.getElementById('bookList').style.display = 'none';
  document.getElementById('addNewBook').style.display = '';
  document.getElementById('contact').style.display = 'none';
});
document.getElementById('contactMenu').addEventListener('click', () => {
  document.getElementById('bookList').style.display = 'none';
  document.getElementById('addNewBook').style.display = 'none';
  document.getElementById('contact').style.display = '';
});

class Books {
  constructor() {
    this.books = this.getBooks();
    this.bookListContainer = document.querySelector(".book-list");
    this.form = document.querySelector(".form");

    this.populateUI();
  }

  getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
  }

  populateUI() {
    let generalMarkup = ``;
    this.books.forEach((book) => {
      generalMarkup += `
      <div class="books">
          <p>"${book.title}" by ${book.author}</p>
          <p><button class="remove-book-btn" data-id=${book.id}>Remove</button></p>
      </div>
      `;
    });

    if (this.books.length === 0) {
      generalMarkup = `
      <div class="no-books-container">
      <h3>No books to display.</h3>
      <p>Add a book.</p>
      </div>
      `;
    }

    this.bookListContainer.insertAdjacentHTML("afterbegin", generalMarkup);
  }

  addBook() {
    const formData = {};
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      formData.title = e.target.title.value;
      formData.author = e.target.author.value;
      formData.id = Date.now().toString();

      // Get latest books arr and add new book

      this.books.push(formData);

      // Update local storage - over ride the existing arr with new arr
      localStorage.setItem("books", JSON.stringify(this.books));

      // Refresh page
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    });
  }

  removeBook(id) {
    const filteredBooks = this.books.filter((book) => book.id !== id);

    // Update local storage
    localStorage.setItem("books", JSON.stringify(filteredBooks));

    // Update ui
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  removeBookHandler() {
    // REMOVE BOOK - Event bubbling
    this.bookListContainer.addEventListener("click", (e) => {
      const clickedBtn = e.target.closest(".remove-book-btn");

      if (!clickedBtn) return;
      const idToRemove = clickedBtn.dataset.id;

      this.removeBook(idToRemove);
    });
  }
}

const createBook = new Books();

createBook.addBook();
createBook.removeBookHandler();
