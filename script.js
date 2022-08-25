

//popup page

const openModalButtons = document.querySelectorAll("[data-modal-target]")
const closeModalButtons = document.querySelectorAll("[data-close-button]")
const overlay = document.getElementById("overlay")

openModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener ("click", () => {
    const modals = document.querySelectorAll(".modal.active")
    modals.forEach(modal => {
        closeModal(modal)
    } )
})

closeModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = button.closest(".modal")
        closeModal(modal)
    })
})

function openModal (modal) {
    if (modal == null) return
    modal.classList.add("active")
    overlay.classList.add("active")
}

function closeModal (modal) {
    if (modal == null) return
    modal.classList.remove("active")
    overlay.classList.remove("active")
}

// const submitButton = document.querySelector("#submitButton")
// let bookTitle = document.querySelector("#title")
// let bookAuthor = document.querySelector("#author")
// let bookPages = document.querySelector("#pages")
// let bookReadStatus = document.querySelector("#readStatus")
// submitButton.addEventListener("click", () => {
//     console.log("Clicked!")
// })

const form = document.querySelector("form");
const addBook = document.querySelector("#addBook");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#readstatus");
const container = document.querySelector("#cardContainer");

//program uses two counters: i & linkNo. i is used to create the book card content
// and linkNo is used to delete and change book read status. i increases and
//decreases to match the index number of the array (add book increases, delete
//decreases). linkNo doesn't decrease on deletion, to ensure a unique number
//is given to each array element. removeCard & changeReadStatus functions use these
//unique numbers.

let i = -1;
let linkNo = -1;
let bookList = [];

addBook.addEventListener("click", makeBook);

function Book(title, author, pages, readStatus, linkNo) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.linkNo = linkNo;
}

function makeBook() {
  linkNo++;

  let newBook = new Book(
    title.value,
    author.value,
    pages.value,
    readStatus.checked,
    linkNo
  );
  bookList.push(newBook);
  makeCard();
  form.reset();
  closeModal(modal)
}

function makeCard() {
  i++;
  let cardContainer = document.createElement("div");
  let cardContainerTop = document.createElement("div");
  let cardContainerBottom = document.createElement("div");
  let cardTitle = document.createElement("div");
  let cardAuthor = document.createElement("div");
  let cardPages = document.createElement("div");
  let cardReadStatus = document.createElement("div");
  let deleteButton = document.createElement("button");
  let statusToggle = document.createElement("button");
  //this is where you put the index no
  deleteButton.dataset.indexNo = i;
  deleteButton.classList.add("deleteButton");
  statusToggle.dataset.linkNo = linkNo;
  statusToggle.classList.add("toggleButton");
  cardContainer.setAttribute(
    "style",
    "display: flex; flex-direction:column; border: solid 1px black; padding: 8px; gap: 3px; justify-content: space-between"
  );
  cardContainerTop.setAttribute(
    "style",
    "display: flex; flex-direction: column; "
  );
  cardContainerBottom.setAttribute(
    "style",
    "display: flex; flex-direction: column; gap: 3px"
  );

  cardTitle.textContent = `Title: ${bookList[i].title}`;
  cardAuthor.textContent = `Author: ${bookList[i].author}`;
  cardPages.textContent = `Pages: ${bookList[i].pages}`;
  if (bookList[i].readStatus === true) {
    cardReadStatus.textContent = `Read Status: Read`;
  } else {
    cardReadStatus.textContent = `Read Status: Not read`;
  }
  cardReadStatus.classList.add("status");
  deleteButton.textContent = "Delete this book";
  statusToggle.textContent = "Change read status";
  deleteButton.addEventListener("click", removeCard);
  statusToggle.addEventListener("click", changeReadStatus);
  cardContainerTop.append(cardTitle, cardAuthor, cardPages, cardReadStatus);
  cardContainerBottom.append(statusToggle, deleteButton);
  cardContainer.append(cardContainerTop, cardContainerBottom);
  container.appendChild(cardContainer);
}

function removeCard() {
  bookList.splice(this.dataset.indexNo, 1);
  this.parentElement.parentElement.remove();
  i--;
  decrementIndexNo(this.dataset.indexNo);
}

function decrementIndexNo(indexNo) {
  let buttons = document.querySelectorAll(".deleteButton");
  buttons.forEach((button) => {
    if (button.dataset.indexNo > indexNo) {
      button.dataset.indexNo--;
    }
  });
}

function changeReadStatus() {
  let targetElement = bookList.find((a) => a.linkNo == this.dataset.linkNo);

  targetElement.readStatus = !targetElement.readStatus;
  if (targetElement.readStatus === true) {
    this.parentElement.previousSibling.lastElementChild.textContent = `Read Status: Read`;
  } else {
    this.parentElement.previousSibling.lastElementChild.textContent = `Read Status: Not read`;
  }
}