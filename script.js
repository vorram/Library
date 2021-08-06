let myLibrary = [];

/* function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    let currentDate = new Date();
    this.date = currentDate.toLocaleDateString('ru-RU');
} */

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        let currentDate = new Date();
        this.date = currentDate.toLocaleDateString('ru-RU');
    }
}

const newBookBtn = document.querySelector('#new-book-btn');
const blackout = document.querySelector('#blackout');
const form = document.querySelector('#new-book-form');
newBookBtn.addEventListener('click', function() {
    blackout.style.display = 'block';
    form.style.display = 'block';
});

const closeBtn = document.querySelector('#close');
closeBtn.addEventListener('click', function() {
    newBookTitle.value = '';
    newBookAuthor.value = '';
    newBookPages.value = '';
    newBookRead.checked = false;
    newBookUnread.checked = true;
    blackout.style.display = 'none';
    form.style.display = 'none';
});

const newBookTitle = document.querySelector('#new-book-title');
const newBookAuthor = document.querySelector('#new-book-author');
const newBookPages = document.querySelector('#new-book-pages');
const newBookRead = document.querySelector('#new-book-read');
const newBookUnread = document.querySelector('#new-book-unread');
const table = document.querySelector('.table');
const submitBtn = document.querySelector('#submit');

function displayBooks() {
    myLibrary.forEach(function(item) {
        let newTableEntry = document.createElement('div');
        newTableEntry.classList.add('table-entry');
        table.appendChild(newTableEntry);
        let titleSpan = document.createElement('span');
        titleSpan.textContent = item.title;
        newTableEntry.appendChild(titleSpan);
        let authorSpan = document.createElement('span');
        authorSpan.textContent = item.author;
        newTableEntry.appendChild(authorSpan);
        let pagesSpan = document.createElement('span');
        pagesSpan.textContent = item.pages;
        newTableEntry.appendChild(pagesSpan);
        let dateSpan = document.createElement('span');
        dateSpan.textContent = item.date;
        newTableEntry.appendChild(dateSpan);
        let readSpan = document.createElement('span');
        if (item.isRead) {
            readSpan.textContent = 'Yes';
            newTableEntry.style.backgroundColor = 'rgb(188, 223, 124)';
        } else {
            readSpan.textContent = 'No';
        }
        newTableEntry.appendChild(readSpan);
        let readBtn = document.createElement('button');
        if (item.isRead) {
            readBtn.textContent = 'Unmark as read';
        } else {
            readBtn.textContent = 'Mark as read';
        }
        newTableEntry.appendChild(readBtn);
        readBtn.addEventListener('click', function() {
            if (item.isRead) {
                readBtn.textContent = 'Mark as read';
                newTableEntry.style.backgroundColor = 'rgb(223, 180, 124)';
                item.isRead = false;
                readSpan.textContent = 'No';
                localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
            } else {
                readBtn.textContent = 'Unmark as read';
                newTableEntry.style.backgroundColor = 'rgb(188, 223, 124)';
                item.isRead = true;
                readSpan.textContent = 'Yes';
                localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
            }
        });
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        newTableEntry.appendChild(removeBtn);
        removeBtn.addEventListener('click', function() {
            table.removeChild(newTableEntry);
            let bookIndex = myLibrary.findIndex(book => book.title == item.title && book.author == item.author && book.pages == item.pages);
            myLibrary.splice(bookIndex, 1);
            localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
        });
    });
}

if (localStorage.getItem('myLibrary') !== null) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    displayBooks();
} 

submitBtn.addEventListener('click', function() {
    let bookTitle = newBookTitle.value;
    let bookAuthor = newBookAuthor.value;
    let bookPages = newBookPages.value;
    let bookRead = newBookRead.checked;
    if (bookTitle === '' || bookAuthor === '' || bookPages === '') {
        alert('Please fill out every field.');
    } else {
    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    myLibrary.push(newBook);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    newBookTitle.value = '';
    newBookAuthor.value = '';
    newBookPages.value = '';
    newBookRead.checked = false;
    newBookUnread.checked = true;
    blackout.style.display = 'none';
    form.style.display = 'none';
    let tableEntries = document.getElementsByClassName('table-entry');
    while (tableEntries[0]) {
        tableEntries[0].parentNode.removeChild(tableEntries[0]);
    }
    displayBooks();
    }
});