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

function emptyValue(name, author, pages, form) {
  name.value = "";
  author.value = "";
  pages.value = "";
  form.style.display = "none";
};

function makeUserInput(name, author, pages, status) {
  let userInput = new Book(
    name.value,
    author.value,
    pages.value,
    status
  )
  return userInput;
};

 const getInput = (() => {
  const name = document.getElementById("book-name");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const status = document.getElementById("read-notRead");
  const form = document.getElementById("formPopUp");

  return {
    name,
    author,
    pages,
    status,
    form,
  }
})();

function addBookToLibrary() {
  let bookStatusValue = "Not Done Reading";

  if ((getInput.name.value || getInput.author.value || getInput.pages.value) == "") {
    console.log("error pls type again");
  } else {
    if (getInput.status.checked) {
      bookStatusValue = "Done Reading";
    }
    let inputOfUser = makeUserInput(getInput.name, getInput.author, getInput.pages, bookStatusValue);
    myLibrary.push(inputOfUser);
    displayBook(inputOfUser);
    emptyValue(getInput.name, getInput.author, getInput.pages, getInput.form);
  };
};

function statusStyleBtn(statusBtn) {
  if (statusBtn.textContent === "Done Reading") {
    statusBtn.style.color = "green";
  } else if (statusBtn.textContent === "Not Done Reading") {
    statusBtn.style.color = "black";
  };
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
  readStatusBtn.setAttribute('id', book.title);
  readStatusBtn.textContent = book.status;

  let titleBook = document.createElement("p");
  titleBook.classList.add("book-title");
  titleBook.textContent = book.title;

  let authorBook = document.createElement("p");
  authorBook.textContent = `By: ${book.author}`;

  let pagesBook = document.createElement("p");
  pagesBook.textContent = `${book.pages} pages`;

  let readBook = document.createElement("p");

  div.appendChild(titleBook);
  div.appendChild(authorBook);
  div.appendChild(pagesBook);
  div.appendChild(readStatusBtn);
  div.appendChild(readBook);
  div.appendChild(btnRemove);
  container.appendChild(div);

  statusStyleBtn(readStatusBtn);

  readStatusBtn.addEventListener("click", () => {
    if (readStatusBtn.textContent === "Done Reading") {
      book.status = "Not Done Reading";
      readStatusBtn.style.color = "black";
      readStatusBtn.textContent = book.status;
    } else if (readStatusBtn.textContent === "Not Done Reading") {
      book.status = "Done Reading";
      readStatusBtn.textContent = book.status;
      readStatusBtn.style.color = "green";
    };
  });

  btnRemove.addEventListener("click", () => {
    div.remove();
    let target = book;
    let targetIndex = myLibrary.indexOf(target);
    myLibrary.splice(targetIndex, 1);
  });
};

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
