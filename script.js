let myLibrary = [];

function Book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    console.log(`${this.title} by ${this.author},${this.pages},${this.read}`)
};

function addBookToLibrary() {
    const userInput = prompt('Which book would you like to add','TOP book');
};