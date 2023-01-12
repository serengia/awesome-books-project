// Sections
const allSections = document.querySelectorAll(".section");
const bookListSection = document.getElementById("section-book-list");
const addBookSection = document.getElementById("section-add-new-book");
const contactSection = document.getElementById("section-contact");

// Menu buttons
const listMenuBtn = document.getElementById("listMenu");
const addBookMenuBtn = document.getElementById("addBookMenu");
const contactMenuBtn = document.getElementById("contactMenu");

// Date element
const dateElement = document.querySelector(".date");

// /////////////////////////
// // DYNAMIC PAGE FUNCTIONALITY
// ////////////////////

function reset() {
  allSections.forEach((node) => {
    node.style.display = "none";
  });
}

// On window.load
reset();
bookListSection.style.display = "block";

// Clicks handler
listMenuBtn.addEventListener("click", () => {
  reset();
  bookListSection.style.display = "block";
});

addBookMenuBtn.addEventListener("click", () => {
  reset();
  addBookSection.style.display = "block";
});

contactMenuBtn.addEventListener("click", () => {
  reset();
  contactSection.style.display = "block";
});

// /////////////////////////
// // BOOK CLASS FUNCTIONALITY
// ////////////////////
class Books {
  constructor() {
    this.bookListContainer = document.querySelector(".book-list");
    this.form = document.querySelector(".form");

    this.books = this.getBooks();

    this.populateUI();
  }

  getBooks() {
    return JSON.parse(localStorage.getItem("books")) || [];
  }

  noBooksMarkup() {
    return `<div class="no-books-container" id="sere-test">
    <h3>No books to display.</h3>
    <p>Add a book.</p>
    </div>`;
  }

  populateUI() {
    let generalMarkup = ``;

    this.books.forEach((book) => {
      generalMarkup += `
      <div class="book">
          <p>"${book.title}" by ${book.author}</p>
          <p><button class="remove-book-btn" data-id=${book.id}>Remove</button></p>
      </div>
      `;
    });

    if (this.books.length === 0) {
      generalMarkup = this.noBooksMarkup();
    }

    // this.bookListContainer.insertAdjacentHTML("afterbegin", generalMarkup);
    this.bookListContainer.innerHTML = generalMarkup;
  }

  insertBook(bookObj) {
    const bookMarkup = `<div class="book">
         <p>"${bookObj.title}" by ${bookObj.author}</p>
         <p><button class="remove-book-btn" data-id=${bookObj.id}>Remove</button></p>
      </div>`;

    this.bookListContainer.insertAdjacentHTML("beforeend", bookMarkup);
  }

  showSuccessMessage() {
    const successMarkup = `<p class="add-book-success-notification" style="color: green">Book successfully added</p>`;
    this.form.insertAdjacentHTML("afterbegin", successMarkup);

    setTimeout(() => {
      // successMarkup.remove();
      document.querySelector(".add-book-success-notification")?.remove();

      // Auto focus the first form input
      document.getElementById("title").focus();
    }, 1000);
  }

  addBook() {
    const formData = {};
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = e.target.title.value;
      const author = e.target.author.value;

      if (title.trim().length === 0 || author.trim().length === 0) {
        return;
      }

      formData.title = title;
      formData.author = author;
      formData.id = Date.now().toString();

      this.books.push({ ...formData });

      // Empty input fields
      e.target.title.value = "";
      e.target.author.value = "";

      // Show success message
      this.showSuccessMessage();

      // Remove no books to display if it exists => OPTIONAL CHAINING
      document.querySelector(".no-books-container")?.remove();

      // Update local storage - over ride the existing arr with new arr
      localStorage.setItem("books", JSON.stringify(this.books));

      // this.insertBook(formData);
      this.populateUI();
    });
  }

  removeBookHandler() {
    // REMOVE BOOK - Event bubbling
    this.bookListContainer.addEventListener("click", (e) => {
      const clickedBtn = e.target.closest(".remove-book-btn");

      if (!clickedBtn) return;

      const idToRemove = clickedBtn.dataset.id;
      const books = this.getBooks();
      const filteredBooks = books.filter((book) => book.id !== idToRemove);

      // Remove a book without refreshing the page
      // parentElement => book
      const parentElement = clickedBtn.closest(".book");
      parentElement.remove();

      // Add the nobooks markup if there is no book remaining
      if (filteredBooks.length === 0) {
        this.bookListContainer.innerHTML = this.noBooksMarkup();
      }

      // Update local storage
      localStorage.setItem("books", JSON.stringify(filteredBooks));
    });
  }
}

const createBook = new Books();

createBook.addBook();
createBook.removeBookHandler();

// Display date
setInterval(() => {
  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = date.toLocaleTimeString();
  const dateTime = `${formattedDate}, ${time}`;
  dateElement.innerHTML = dateTime;
}, 1000);
