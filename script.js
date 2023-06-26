let myLibrary = [];

class Book {
  
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  };

  info() {
    console.log(`${this.title} by ${this.author},${this.pages},${this.status}`);
  }
  
}

function addBookToLibrary() {
  let bookStatusValue = "Not Done Reading";

  const bookName = document.getElementById("book-name");
  const bookAuthor = document.getElementById("author");
  const bookPages = document.getElementById("pages");
  const bookStatus = document.getElementById("read-notRead");
  const popUpForm = document.getElementById("formPopUp");

  if ((bookName.value || bookAuthor.value || bookPages.value) == "") {
    console.log("error pls type again");
  } else {
    if (bookStatus.checked) {
      bookStatusValue = "Done Reading";
    }
    let userInput = new Book(
      bookName.value,
      bookAuthor.value,
      bookPages.value,
      bookStatusValue
    );
    console.log("your book has been pushed :)");
    myLibrary.push(userInput);
    displayBook(userInput);
    bookName.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
    popUpForm.style.display = "none";
  }
}

function displayBook(book) {
  const container = document.querySelector(".container");

  const div = document.createElement("div");
  div.classList.add("card");
  const btnRemove = document.createElement("button");
  btnRemove.textContent = "DELETE";
  btnRemove.classList.add("remove-btn");
  const readStatusBtn = document.createElement("button");
  readStatusBtn.classList.add("book-status-btn");
  let titleBook = document.createElement("p");
  titleBook.classList.add("book-title");
  let authorBook = document.createElement("p");
  let pagesBook = document.createElement("p");
  let readBook = document.createElement("p");
  titleBook.textContent = book.title;
  authorBook.textContent = `By: ${book.author}`;
  pagesBook.textContent = `${book.pages} pages`;
  readStatusBtn.textContent = book.status;
  div.appendChild(titleBook);
  div.appendChild(authorBook);
  div.appendChild(pagesBook);
  div.appendChild(readStatusBtn);
  div.appendChild(readBook);
  div.appendChild(btnRemove);
  container.appendChild(div);

  if (readStatusBtn.textContent === "Done Reading") {
    readStatusBtn.style.color = "green";
  } else if (readStatusBtn.textContent === "Not Done Reading") {
    readStatusBtn.style.color = "black";
  }

  readStatusBtn.addEventListener("click", () => {
    if (readStatusBtn.textContent === "Done Reading") {
      book.status = "Not Done Reading";
      readStatusBtn.style.color = "black";
      readStatusBtn.textContent = book.status;
    } else if (readStatusBtn.textContent === "Not Done Reading") {
      book.status = "Done Reading";
      readStatusBtn.textContent = book.status;
      readStatusBtn.style.color = "green";
    }
  });

  btnRemove.addEventListener("click", () => {
    div.remove();
    let target = book;
    let targetIndex = myLibrary.indexOf(target);
    myLibrary.splice(targetIndex, 1);
  });
}

const addBookBtn = document.getElementById("addBook");
addBookBtn.addEventListener("click", () => {
  const popUpForm = document.getElementById("formPopUp");
  popUpForm.style.display = "flex";
});

const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

const hideForm = document.getElementById("hideFormBtn");
hideForm.addEventListener("click", () => {
  const popUpForm = document.getElementById("formPopUp");
  popUpForm.style.display = "none";
});
