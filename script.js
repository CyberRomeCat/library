let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  console.log(`${this.title} by ${this.author},${this.pages},${this.read}`);
};

function addBookToLibrary() {
  let bookName = document.getElementById("book-name");
  let bookAuthor = document.getElementById("author");
  let bookPages = document.getElementById("pages");
  let bookRead = document.getElementById("read-notRead");

  let bookReadValue = "";

  if ((bookName.value || bookAuthor.value || bookPages.value) == "") {
    console.log("error pls type again");
  } else {
    if (bookRead.checked) {
      bookReadValue = "Done reading";
    } else {
      bookReadValue = "Not Done reading";
    }
    const userInput = new Book(
      bookName.value,
      bookAuthor.value,
      bookPages.value,
      bookReadValue
    );
    console.log("your book has been pushed :)");
    myLibrary.push(userInput);
  }
}

function displayBook() {
  const container = document.querySelector(".container");

  myLibrary.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("card");
    const titleBook = document.createElement("p");
    const authorBook = document.createElement("p");
    const pagesBook = document.createElement("p");
    const readBook = document.createElement("p");
    authorBook.textContent = book.author;
    titleBook.textContent = book.title;
    pagesBook.textContent = book.pages;
    readBook.textContent = book.read;
    div.appendChild(titleBook);
    div.appendChild(authorBook);
    div.appendChild(pagesBook);
    div.appendChild(readBook);
    container.appendChild(div);
  });
}

const addBookBtn = document.getElementById("addBook");
addBookBtn.addEventListener("click", () => {
  const popUpForm = document.getElementById("formPopUp");
  popUpForm.style.display = "block";
});

const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

displayBook();
