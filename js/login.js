"use strict"
///SELECT ELEMENTS
const elBookList = document.querySelector(".siteMain__bookList");
const elBookSearchInput = document.querySelector(".searchInput");
const elSearchResult = document.querySelector(".siteHeader__resultNumber");
const elBookmarkList = document.querySelector(".bookMarkWrapper__bookmarkList")
const elOrderBtn = document.querySelector(".siteHeader__orderButton");
///MODAL
const elModal = document.querySelector(".modal");
const elOverlay = document.querySelector("overlay");
////LOGOUT BTN PART
const elLogOutBtn = document.querySelector(".logoutBtn");
const token = window.localStorage.getItem("token");

if(!token) {
    window.location.replace("index.html")
};
elLogOutBtn.addEventListener ("click", function (){
   window.location.replace("index.html");
});

let search = "python";
let order = "relevance";
let page = 0;
let itemsNumber = 9;
////RENDERBOOK FUNCTION
const renderBooks = function (arr, elBookList){
    arr.forEach((items)=>{

        ////CREATE ELEMENT

        const dataListItem = document.createElement("li");
        const dataListItemImage = document.createElement("img");
        const dataListItemDiv = document.createElement("div");
        const dataListItemTitle = document.createElement("h6");
        const dataListItemAuthors = document.createElement("p");
        const dataListItemYear = document.createElement("p");
        const dataListItemButtonDiv = document.createElement("div");
        const dataListItemBookmarkButton = document.createElement("button");
        const dataListItemInfoLink = document.createElement("button");
        const dataListItemReadLink = document.createElement("a");


        ////SET ATTRIBUTE

        dataListItem.setAttribute("class", "card  mb-5 border-0 shadow-sm p-3 mb-5 bg-body rounded");
        dataListItem.style.width = "15rem";
        dataListItemImage.setAttribute("class","cardImage shadow-sm p-3");
        dataListItemImage.setAttribute("src", items.volumeInfo.imageLinks.thumbnail);
        dataListItemDiv.classList.add("card-body","p-3");
        dataListItemTitle.classList.add("booksTitle");
        dataListItemAuthors.classList.add("booksAuthor");
        dataListItemYear.classList.add("booksYear");
        dataListItemButtonDiv.classList.add("buttonWrapper");
        dataListItemBookmarkButton.setAttribute("class", "bookmarkBtn btn btn-warning");
        dataListItemInfoLink.setAttribute("class", "moreInfoLink btn btn-light");
        dataListItemReadLink.setAttribute("class", "readLink btn btn-secondary mt-2 w-100");

        ////TEXT CONTENT

        dataListItemTitle.textContent = items.volumeInfo.title;
        dataListItemAuthors.textContent = items.volumeInfo.authors;
        dataListItemYear.textContent = items.volumeInfo.publishedDate;
        dataListItemBookmarkButton.textContent = "Bookmark";
        dataListItemInfoLink.textContent = "More Info";
        dataListItemReadLink.textContent = "Read";


        ////DATASET

        dataListItemBookmarkButton.dataset.bookmarkBtnId = items.id;

        ////APPENDCHILD

        elBookList.appendChild(dataListItem);
        dataListItem.appendChild(dataListItemImage);
        dataListItem.appendChild(dataListItemDiv);
        dataListItem.appendChild(dataListItemButtonDiv);
        dataListItemDiv.appendChild(dataListItemTitle);
        dataListItemDiv.appendChild(dataListItemAuthors);
        dataListItemDiv.appendChild(dataListItemYear);
        dataListItemButtonDiv.appendChild(dataListItemBookmarkButton);
        dataListItemButtonDiv.appendChild(dataListItemInfoLink);
        dataListItem.appendChild(dataListItemReadLink);
    });
};

////GETBOOKS FUNCTION
const getBooks = async function () {
    const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&orderBy=${order}&startIndex=${page}&maxResults=${itemsNumber}`);
    elBookList.innerHTML=null;


    const data = await request.json();
    if ((data.response ="True" && data.items.length > 0)){
        renderBooks (data.items, elBookList);
    };
    elSearchResult.textContent = data.totalItems;

};
getBooks();

////SEARCHING BOOKS FUNCTION
elBookSearchInput.addEventListener("change", function (){
    const searchInputValue = elBookSearchInput.value;
    search = searchInputValue;
    getBooks();
});


////ORDER BOOKS
elOrderBtn.addEventListener("click", function (){
    const newOrderBooks = "newest";
    order=newOrderBooks;
    getBooks();
});
