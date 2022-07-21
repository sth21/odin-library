let myLibrary = [];
let addBook = document.querySelector('#add-book');
let overlay = document.querySelector('#overlay');
let main = document.querySelector('main');
let readbtns;
let removebtns;

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary () {
    let length = myLibrary.length - 1;
    let div = document.createElement('div');
    div.classList.add('book');
    let title = document.createElement('p');
    title.textContent = myLibrary[length].title;
    div.appendChild(title);
    let author = document.createElement('p');
    author.textContent = myLibrary[length].author;
    div.appendChild(author);
    let pages = document.createElement('p');
    pages.textContent = `${myLibrary[length].pages} pages`;
    div.appendChild(pages);
    let readStatus = document.createElement('button');
    readStatus.classList.add('main-button');
    readStatus.setAttribute('id', 'read-status');
    (myLibrary[length].isRead) ? readStatus.textContent = 'Read' : readStatus.textContent = 'Not Read';
    (myLibrary[length].isRead) ? readStatus.style.backgroundColor = '#70ff70' : readStatus.style.backgroundColor = '#ff7070';
    div.appendChild(readStatus);
    let remove = document.createElement('button');
    remove.classList.add('main-button');
    remove.setAttribute('id', 'remove');
    remove.textContent = 'Remove';
    div.appendChild(remove);
    main.appendChild(div);
    readButtonEvent(document.querySelectorAll('#read-status')); // Adds Event Listener to all read buttons
    removeButtonEvent(document.querySelectorAll('#remove')); // Adds Event Listener to all remove buttons
}

addBook.addEventListener('click', () => {
    overlay.classList.remove("input-inactive");
    overlay.classList.add("input-active");
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#is-read').checked = false;
});

document.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let isRead = document.querySelector('#is-read').checked;
    myLibrary[myLibrary.length] = new Book(title, author, pages, isRead);
    addBookToLibrary();
    overlay.classList.remove("input-active");
    overlay.classList.add("input-inactive");
});

function readButtonEvent(buttons) {
    buttons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            (myLibrary[index].isRead) ? button.style.backgroundColor = '#ff7070' : button.style.backgroundColor = '#70ff70';
            (myLibrary[index].isRead) ? button.textContent = 'Not Read' : button.textContent = 'Read';
            (myLibrary[index].isRead) ? myLibrary[index].isRead = false : myLibrary[index].isRead = true;
        });
    });
}

function removeButtonEvent(buttons) {
    buttons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            let removed = document.querySelector(`main:nth-child(${index})`);
            console.log(removed);
            myLibrary.splice(index - 1, 1);
            main.removeChild(removed);
        });
    });
}