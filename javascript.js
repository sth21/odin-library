// Global Var
let myLibrary = [];
let addBook = document.querySelector('#add-book');
let overlay = document.querySelector('#overlay');
let main = document.querySelector('main');
let readbtns;
let removebtns;

function Book(title, author, pages, isRead) { // Book object constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary () { // Creates book in DOM
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
    readButtonEvent(readStatus, length); // Adds Event Listener to read toggle button
    removeButtonEvent(remove, length); // Adds Event Listener to remove button
    keepStats(); // Updates sidebar statistics for new book addition
}

addBook.addEventListener('click', () => { // Adds book on click
    overlay.classList.remove("input-inactive");
    overlay.classList.add("input-active");
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#is-read').checked = false;
});

document.addEventListener('submit', (e) => { // Stores book in library and DOM on click
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

function readButtonEvent(button, index) { // Toggles isRead on book on click
    button.addEventListener('click', (event) => {
        (myLibrary[index].isRead) ? button.style.backgroundColor = '#ff7070' : button.style.backgroundColor = '#70ff70';
        (myLibrary[index].isRead) ? button.textContent = 'Not Read' : button.textContent = 'Read';
        (myLibrary[index].isRead) ? myLibrary[index].isRead = false : myLibrary[index].isRead = true;
        keepStats(); // Update sidebar statistics for change in book settings
    });
}

function removeButtonEvent(button, index) { // Removes book in Library and DOM on click
    button.addEventListener('click', (event) => {
        myLibrary.splice(index - 1, 1);
        main.removeChild(event.target.parentNode);
        keepStats(); // Update sidebar statistics for new book removal
    });
}

function keepStats() {
    let books = myLibrary.length;
    let completedBooks = 0;
    let percentUnread;
    let totalPages = 0;
    for (let i = 0; i < myLibrary.length; ++i) {
        (myLibrary[i].isRead) ? ++completedBooks : completedBooks += 0;
        totalPages += parseInt(myLibrary[i].pages);
    }
    percentUnread = ((books - completedBooks) / books).toFixed(2) * 100;
    (isNaN(percentUnread)) ? percentUnread = 0 : percentUnread;
    document.querySelector('.book-stat').textContent = `Books: ${books}`;
    document.querySelector('.completed-book-stat').textContent = `Completed Books: ${completedBooks}`;
    document.querySelector('.percent-unread-stat').textContent =  `Percent Unread: ${percentUnread}%`;
    document.querySelector('.total-pages-stat').textContent = `Total Pages: ${totalPages}`;
}