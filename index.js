
//const dotenv = require('dotenv');
//dotenv.config();
const apiURL = 'https://www.googleapis.com/books/v1';
//accessing the key from .env
const apiKey = process.env.API_KEY;

//console.log(apiKey);
let searchButton = document.getElementById("searchButton");



const fetchAPIData = async (searchTerms) => {
    try {
        const requestUrl = `${apiURL}/volumes?q=${encodeURIComponent(searchTerms)}&key=${apiKey}`;
        //const requestUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&key=${apiKey}`;
        const response = await fetch(requestUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('fetch error', error);
    }
}

const displayBookResults = (books) => {

    const bookResultsDiv = document.getElementById('bookResults');
    bookResultsDiv.innerHTML = ''; // Clear previous results

    //getting the books info

    books.forEach((item, index) => {
        const volumeInfo = item.volumeInfo;
        const bookElement = document.createElement('div');
        const imageLink = volumeInfo.imageLinks?.thumbnail || ''; //get the book image or show nothing if image not available
        bookElement.innerHTML = `
            <p><strong>Book ${index + 1}:</strong></p>  
            <img src="${imageLink}" alt="Book Cover">
            <p><strong>Title:</strong> ${volumeInfo.title}</p>
            <p><strong>Authors:</strong> ${volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown'}</p>
            <p><strong>Description:</strong> ${volumeInfo.description || 'No description available'}</p>
            
            <hr>
        `;
        bookResultsDiv.appendChild(bookElement);
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


//searchButton.addEventListener('click', searchBooks)



/*const printBook = async () => {
    book = await fetchAPIData();
    book.items
        .filter(item => item.volumeInfo.title.toLowerCase().includes(searchTerms.toLowerCase()))
        .forEach((item, index) => {
            const volumeInfo = item.volumeInfo;
            console.log(`Book ${index + 1}:`);
            console.log(`Title: ${volumeInfo.title}`);
            console.log(`Authors: ${volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown'}`);
            console.log(`Description: ${volumeInfo.description || 'No description available'}`);
            console.log('---');
        });
};

printBook();*/


