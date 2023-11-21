
//const dotenv = require('dotenv');
//dotenv.config();
const apiURL = 'https://www.googleapis.com/books/v1';
let theBook;
let data;
//accessing the key from .env
//const apiKey = process.env.API_KEY;
const apiKey = 'AIzaSyDMqxEZnqeeBWHc6798LShJFHOHzepkWBg';
//console.log(apiKey);
let searchButton = document.getElementById("searchButton");
const favAPI = 'https://655bbf43ab37729791a98ae9.mockapi.io/fav/v1';


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const requestUrl = `https://www.googleapis.com/books/v1/volumes?q=programming&orderBy=newest&key=${apiKey}`;
        //console.log('Request URL:', requestUrl);
        //const requestUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&key=${apiKey}`;
        const response = await fetch(requestUrl);
        theBook = await response.json();
        displayBookResults(theBook.items);
    } catch (error) {
        console.error('fetch error', error);
    }

});



const fetchAPIData = async (bookTitle) => {
    try {
        const requestUrl = `${apiURL}/volumes?q=${encodeURIComponent(bookTitle)}&key=${apiKey}`;
        //const requestUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&key=${apiKey}`;
        const response = await fetch(requestUrl);
        data = await response.json();
        return data;
    } catch (error) {
        console.error('fetch error', error);
    }
}

const toggleDescription = (event) => {
    const descripToggle = event.currentTarget.querySelector('.description');
    if (descripToggle) {
        descripToggle.classList.toggle('show');
    }
};

const displayBookResults = (books) => {

    const bookResultsDiv = document.getElementById('bookResults');
    bookResultsDiv.innerHTML = ''; // Clear previous results

    //getting the books info

    books.forEach((item, index) => {
        const volumeInfo = item.volumeInfo;
        const bookElement = document.createElement('article');
        bookElement.classList.add('bookArticle'); //giving class to articles
        const imageLink = volumeInfo.imageLinks?.thumbnail || ''; //get the book image or show nothing if image not available
        const descriptionText = volumeInfo.description || 'No description available';
        //adding the favourite button to each article
        const favoritesButton = document.createElement('button'); //creating the button
        favoritesButton.classList.add('favoritesButton'); //giving class to the button
        favoritesButton.setAttribute('data-book-id', item.id); //set data-book-id to item.id
        favoritesButton.textContent = 'Add to Favorites'; //setting the button's text content 


        bookElement.innerHTML = `
            
            <img src="${imageLink}" alt="Book Cover">
            <p><strong>Title:</strong> ${volumeInfo.title}</p>
            <p><strong>Authors:</strong> ${volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown'}</p>
            <p class="des"><strong>Description</strong><span class ="description"> ${descriptionText}</span></p>
            
            
            
        `;
        favoritesButton.addEventListener('click', async (event) => {
            event.stopPropagation(); // Prevent the click event from triggering the bookElement click event
            const bookId = event.currentTarget.getAttribute('data-book-id');
            const book = theBook.items.find(item => item.id === bookId) || data.items.find(item => item.id === bookId);
            if (book) {
                saveToFavorite(book);
            }
        });
        bookElement.appendChild(favoritesButton);

        bookResultsDiv.appendChild(bookElement);
        //toggle description
        bookElement.addEventListener('click', toggleDescription);
    });
};

//search button

searchButton.addEventListener('click', async () => {
    const bookNameInput = document.getElementById('bookName');
    const searchTerms = bookNameInput.value;

    if (!searchTerms) {
        alert('Please enter a book name.');
        return;
    }

    const book = await fetchAPIData(searchTerms);
    const filteredBooks = book.items
        .filter(item => item.volumeInfo.title.toLowerCase().includes(searchTerms.toLowerCase()));

    displayBookResults(filteredBooks);
});

//posting the favourite book to the mock api
const saveToFavorite = async (book) => {
    try {
        const response = await fetch(`${favAPI}/favourite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown',
                description: book.volumeInfo.description || 'No description available',
                imageLink: book.volumeInfo.imageLinks?.thumbnail || '',
            }),
        });
        if (response.ok) {
            alert("book added to favorites");
        } else {
            alert("failed to add");
        }
    } catch (error) {
        console.error("error saving to favorite", error);
    }
};

//check to see it works

const displayFavorite = async () => {
    try {
        const response = await fetch(`${favAPI}/favourite`);
        if (response.ok) {
            const favoriteList = await response.json();
            // Display the user's favorite list on the page
            console.log('User\'s Favorite List:', favoriteList);
        } else {
            console.error('Failed to fetch user\'s favorite list.');
        }
    } catch (error) {
        console.error('Error fetching favorite list:', error);
    }


}

displayFavorite();
