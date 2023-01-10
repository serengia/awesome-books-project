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
