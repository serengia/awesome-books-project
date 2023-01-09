const bookListContainer = document.querySelector(".book-list");
const form = document.querySelector(".form");

const getBooks = () => JSON.parse(localStorage.getItem("books")) || [];

const populateUI = () => {
  let generalMarkup = ``;

  //   Get latest books list
  const books = getBooks();

  books.forEach((book) => {
    generalMarkup += `
    <div class="books">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <button class="remove-book-btn" data-id=${book.id}>Remove</button>
                    <hr/>
    </div>
    `;
  });

  bookListContainer.insertAdjacentHTML("afterbegin", generalMarkup);
};

// POPULATE UI ON PAGE LOAD /RELOAD
populateUI();

// ADD BOOK
const addBook = () => {
  const formData = {};
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formData.title = e.target.title.value;
    formData.author = e.target.author.value;
    formData.id = Date.now().toString();

    // Get latest books arr and add new book
    const books = getBooks();
    books.push(formData);

    // Update local storage - over ride the existing arr with new arr
    localStorage.setItem("books", JSON.stringify(books));

    // Refresh page
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  });
};

addBook();

const removeBook = (id) => {
  const books = getBooks();
  const filteredBooks = books.filter((book) => book.id !== id);

  // Update local storage
  localStorage.setItem("books", JSON.stringify(filteredBooks));

  // Update ui
  // eslint-disable-next-line no-restricted-globals
  location.reload();
};

// REMOVE BOOK
bookListContainer.addEventListener("click", (e) => {
  const clickedBtn = e.target.closest(".remove-book-btn");
  if (!clickedBtn) return;

  const idToRemove = clickedBtn.dataset.id;

  removeBook(idToRemove);
});
