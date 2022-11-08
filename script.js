
var books = document.getElementById("books");

var add = document.getElementById("add");
add.addEventListener("click", removeOpen);

var show = document.getElementById("show");
show.addEventListener("click", bookDisplay);

var library = [];

var form = document.getElementById("form");
form.addEventListener("submit", addBookToLibrary);

function addBookToLibrary(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let title = formProps.title;
    let author = formProps.author;
    let pages = formProps.pages;
    let read = hasRead(formProps.read);
    
    const book = new Book(title, author, pages, read);
    library.push(book);

    ifShowBook();
}

function hasRead(params) {
    if (params == "read_book") {
        return true;
    } else {
        return false;
    }
}

function bookDisplay() {
    if (show.innerHTML == "show books" && library.length > 0) {
        showBooks();
    } else {
        hideBooks();
    }
}

function ifShowBook() {
    if (show.innerHTML == "hide books") {
        showBooks();
    }
}

function showBooks() {
    books.innerHTML = "";
    
    for (let i = 0; i < library.length; i++) {
        let bookInfo = library[i].bookInfo();

        const divNode = document.createElement("div");
        divNode.setAttribute("class", "hold-info");
        const textNode = document.createTextNode(bookInfo);

        const removeBtnNode = document.createElement("button");
        removeBtnNode.setAttribute("class", "extra");
        removeBtnNode.setAttribute("id", i);
        removeBtnNode.innerHTML = "remove";

        const readBtnNode = document.createElement("button");
        readBtnNode.setAttribute("class", "extra");
        readBtnNode.setAttribute("id", i);

        if (library[i].read) {
            readBtnNode.innerHTML = "unread";
        } else {
            readBtnNode.innerHTML = "read";
        }

        divNode.appendChild(textNode);
        divNode.appendChild(removeBtnNode);
        divNode.appendChild(readBtnNode);

        removeBtnNode.addEventListener("click", removeBook);
        readBtnNode.addEventListener("click", readStatus);

        books.appendChild(divNode);
        show.innerHTML = "hide books";
    }
}

function hideBooks() {
    books.innerHTML = "";
    show.innerHTML = "show books";
}

function removeBook() {
    let idx = parseInt(this.id);
    library.splice(idx, 1);
    showBooks();
}

function readStatus() {
    let idx = parseInt(this.id);
    library[idx].toggleReadStatus();
    showBooks();
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;

        this.bookInfo = function() {
            let readInfo;
            if (this.read) {
                readInfo = "already read";
            } else {
                readInfo = "not read yet";
            }
            return this.title + " by " + this.author + ", " + this.pages + " pages, " + readInfo;
        }
    }
}

Book.prototype.toggleReadStatus = function () {
    if (this.read) {
        this.read = false;
    } else {
        this.read = true;
    }
}

function removeOpen() {
    let opening = document.querySelector(".opening");
    opening.remove();
}
    