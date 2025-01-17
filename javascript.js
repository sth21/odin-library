class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
    
    addBookToLibrary() { // Creates book in DOM
        let length = myLibrary.length - 1;
        let div = document.createElement('div');
        div.classList.add('book');
        div.classList.add(`number${counter}`);
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
        this.readButtonEvent(readStatus); // Adds Event Listener to read toggle button
        ++counter;
        this.removeButtonEvent(remove); // Adds Event Listener to remove button
        this.keepStats(); // Updates sidebar statistics for new book addition
    }
    
    readButtonEvent(button) { // Toggles isRead on book on click
        button.addEventListener('click', f = (event) => {
            let bookClass;
            for (let i = 0; i < myLibrary.length; ++i) {
                (event.target.parentNode.classList.contains(`number${i}`)) ? bookClass = i : bookClass = bookClass;
            }
            (myLibrary[bookClass].isRead) ? button.style.backgroundColor = '#ff7070' : button.style.backgroundColor = '#70ff70';
            (myLibrary[bookClass].isRead) ? button.textContent = 'Not Read' : button.textContent = 'Read';
            (myLibrary[bookClass].isRead) ? myLibrary[bookClass].isRead = false : myLibrary[bookClass].isRead = true;
            myLibrary[bookClass].keepStats(); // Update sidebar statistics for change in book settings
        });
    }

    removeButtonEvent(button) { // Removes book in Library and DOM on click
        button.addEventListener('click', (event) => {
            let index = myLibrary.length - 1;
            let bookClass;
            for (let i = 0; i < myLibrary.length; ++i) {
                (event.target.parentNode.classList.contains(`number${i}`)) ? bookClass = i : bookClass = bookClass;
            }
            myLibrary.splice(bookClass, 1);
            main.removeChild(event.target.parentNode);
            for (let j = 0; j < index - bookClass; ++j) {
                let classNumb = bookClass + j + 1;
                let remove = document.querySelector(`.number${classNumb}`);
                let removeButton = remove.childNodes[3];
                remove.classList.remove(`number${classNumb}`);
                classNumb -= 1;
                remove.classList.add(`number${classNumb}`);
            }
            --counter;
            this.keepStats(); // Update sidebar statistics for new book removal
        });
    }

    keepStats() {
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
}

let myLibrary = [];
let counter = 0;
let main = document.querySelector('main');
let f;
let addBook = document.querySelector('#add-book');
let overlay = document.querySelector('#overlay');

document.addEventListener('submit', (e) => { // Stores book in library and DOM on click
    if (verifyForm.verifyInputs() === false) {
        verifyForm.verifyTitle();
        verifyForm.verifyAuthor();
        verifyForm.verifyPages();
        e.preventDefault();
        return;
    }
    e.preventDefault();
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let isRead = document.querySelector('#is-read').checked;
    myLibrary[myLibrary.length] = new Book(title, author, pages, isRead);
    myLibrary[myLibrary.length - 1].addBookToLibrary();
    overlay.classList.remove("input-active");
    overlay.classList.add("input-inactive");
});

addBook.addEventListener('click', () => { // Adds book on click
    overlay.classList.remove("input-inactive");
    overlay.classList.add("input-active");
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#is-read').checked = false;
});

const verifyForm = (() => {
    const form = document.querySelector('form');
    const title = document.getElementById('title');
    const titleError = document.querySelector('#title + span.error');
    const author = document.getElementById('author');
    const authorError = document.querySelector('#author + span.error');
    const pages = document.getElementById('pages');
    const pagesError = document.querySelector('#pages + span.error');

    const verifyTitle = () => {
        if (title.validity.valid) {
            titleError.textContent = '';
            titleError.className = 'error';
        } else {
            showError(title, titleError);
        }
    };
    const verifyAuthor = () => {
        if (author.validity.valid) {
            authorError.textContent = '';
            authorError.className = 'error';
        } else {
            showError(author, authorError);
        }
    };
    const verifyPages = () => {
        if (pages.validity.valid) {
            pagesError.textContent = '';
            pagesError.className = 'error';
        } else {
            showError(pages, pagesError);
        }
    };
    const verifyInputs = () => {
        if (!title.validity.valid || !author.validity.valid || !pages.validity.valid) {
            return false;
        } else {
            return true;
        }
    };
    const showError = (input, inputError) => {
        if (input.validity.valueMissing) {
            inputError.textContent = 'Please fill out required field';
        } else {
            if (input.validity.rangeUnderflow) {
                inputError.textContent = 'Page length must be at least 2';
            } else {
                inputError.textContent = 'Page length cannot exceed 10000';
            }
        }
    };
    title.addEventListener('input', verifyTitle);
    author.addEventListener('input', verifyAuthor);
    pages.addEventListener('input', verifyPages);
    return { verifyInputs, verifyAuthor, verifyPages, verifyTitle };
})();
