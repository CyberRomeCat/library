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
    prompt(`type title of book`),
    prompt(`type author of book`),
    prompt("how many pages does this book have?"),
    prompt("Have you read it or not")
  );
  myLibrary.push(userInput);
}

addBookToLibrary();
