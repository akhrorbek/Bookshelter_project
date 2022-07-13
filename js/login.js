"use strict"
///SELECT ELEMENTS
const elBookList = document.querySelector(".siteMain__bookList");
const elBookSearchInput = document.querySelector(".searchInput");
const elSearchResult = document.querySelector(".siteHeader__resultNumber");

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

const getBooks = async function () {
    const request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`);


    elBookList.innerHTML=null;

    const data = await request.json();

    const dataItemInfo = data.items;

    elSearchResult.textContent = data.totalItems;

    dataItemInfo.forEach((items)=>{

        ////CREATE ELEMENT
        const dataListItem = document.createElement("li");
        const dataListItemImage = document.createElement("img");
        const dataListItemDiv = document.createElement("div");
        const dataListItemTitle = document.createElement("h6");
        const dataListItemAuthors = document.createElement("p");
        const dataListItemYear = document.createElement("p");
        const dataListItemButtonDiv = document.createElement("div");
        const dataListItemButton = document.createElement("button");
        const dataListItemLink = document.createElement("a");
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
        dataListItemButton.setAttribute("class", "bookmarkBtn btn btn-warning ");
        dataListItemLink.setAttribute("class", "moreInfoLink btn btn-light mx-1");
        dataListItemReadLink.setAttribute("class", "readLink btn btn-secondary mt-2 w-100");


        dataListItemTitle.textContent = items.volumeInfo.title;
        dataListItemAuthors.textContent = items.volumeInfo.authors;
        dataListItemYear.textContent = items.volumeInfo.publishedDate;
        dataListItemButton.textContent = "Bookmark";
        dataListItemLink.textContent = "More Info";
        dataListItemReadLink.textContent = "Read";



        ////APPENDCHILD

        elBookList.appendChild(dataListItem);
        dataListItem.appendChild(dataListItemImage);
        dataListItem.appendChild(dataListItemDiv);
        dataListItem.appendChild(dataListItemButtonDiv);
        dataListItemDiv.appendChild(dataListItemTitle);
        dataListItemDiv.appendChild(dataListItemAuthors);
        dataListItemDiv.appendChild(dataListItemYear);
        dataListItemButtonDiv.appendChild(dataListItemButton);
        dataListItemButtonDiv.appendChild(dataListItemLink);
        dataListItem.appendChild(dataListItemReadLink);

    })
};
getBooks();


elBookSearchInput.addEventListener("change", function (){
    const searchInputValue = elBookSearchInput.value;

    search = searchInputValue;
    getBooks();
})