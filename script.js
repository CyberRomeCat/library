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
  };
};

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
  div.setAttribute('data-name-delete', book.title);

  const btnRemove = document.createElement("button");
  btnRemove.textContent = "DELETE";
  btnRemove.classList.add("delete-btn");
  btnRemove.setAttribute('id', book.title);

  const readStatusBtn = document.createElement("button");
  readStatusBtn.classList.add("book-status-btn");
  readStatusBtn.setAttribute('id', book.title);
  readStatusBtn.textContent = book.status;
  statusStyleBtn(readStatusBtn);

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
};

function changeStatus(id) {
  let index = myLibrary.findIndex(b => {
    return b.title === id;
  });

  const Done = () => {
    myLibrary[index].status = "Done Reading"
  };

  const NotDone = () => {
    myLibrary[index].status = "Not Done Reading"
  };

  return {Done, NotDone, index};
};

function checkStatus(elementID, IDName) {
  if (elementID.textContent === "Done Reading") {
    changeStatus(IDName).NotDone()
    elementID.style.color = "black";
    elementID.textContent = "Not Done Reading";
  } else if (elementID.textContent === "Not Done Reading") {
    changeStatus(IDName).Done();
    elementID.style.color = "green";
    elementID.textContent = "Done Reading"
  };
};

function errorInput(element) {
  let id = element.getAttribute("id");
  let elementError = document.querySelector(`#${id} + span.error`);

  element.addEventListener("input",(e) => {
    if (element.validity.valid) {
      elementError.textContent = "";
      elementError.className = "error";
    } else {
      showError(element, elementError);
    };
  });

  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    if (!element.validity.valid) {
      e.preventDefault();
      showError(element, elementError);
    } else {
      e.preventDefault();
      addBookToLibrary();
    };
  });
}

function eventListeners() {
  let d = document;
  d.addEventListener("click", (e) => {
  if (e.target.matches(".book-status-btn")) {
    let idName = e.target.getAttribute('id');
    let id = document.getElementById(idName);
    checkStatus(id, idName);
  }
  if (e.target.matches('.delete-btn')) {
    let idName = e.target.getAttribute("id");
    let card = document.querySelector(`[data-name-delete= "${idName}"]`);
    card.remove();
    let targetIndex = changeStatus(idName).index;
    myLibrary.splice(targetIndex, 1);
    console.log(myLibrary);
  };
  if (e.target.matches('#addBook')) {
    const popUpForm = document.getElementById("formPopUp");
    popUpForm.style.display = "flex";
  }
  if (e.target.matches('#hideFormBtn')) {
    const popUpForm = document.getElementById("formPopUp");
    popUpForm.style.display = "none";
  };
  });

  errorInput(getInput.name);
  errorInput(getInput.author);
};

function showError(element, elementError) {
  if (element.validity.valueMissing) {
    elementError.textContent = "You need to enter a value";
    elementError.className = "error active";
  };
};

eventListeners();