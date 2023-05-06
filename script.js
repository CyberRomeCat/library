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
  const userInput = new Book(
    prompt(`type title of book`, "Atomic Habits"),
    prompt(`type author of book`, "James Clear"),
    prompt("how many pages does this book have?", "298 pages"),
    prompt("Have you read it or not", "Yes")
 );

  myLibrary.push(userInput);
}

function displayBook() {
  const container = document.querySelector(".container");

  myLibrary.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("card");
    const titleBook = document.createElement('p');
    const authorBook = document.createElement('p');
    const pagesBook = document.createElement('p');
    const readBook = document.createElement('p');
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

addBookToLibrary();
displayBook()
