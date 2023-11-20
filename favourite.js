


let data;



const favAPI = 'https://655bbf43ab37729791a98ae9.mockapi.io/fav/v1';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const requestUrl = `${favAPI}/favourite`;

        const response = await fetch(requestUrl);
        data = await response.json();
        displayBookResults(data);
        console.log(data);
    } catch (error) {
        console.error('fetch error', error);
    }

});

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
        //const volumeInfo = item.volumeInfo;
        const bookElement = document.createElement('article');
        bookElement.classList.add('bookArticle'); //giving class to articles
        //const imageLink = volumeInfo.imageLinks?.thumbnail || ''; //get the book image or show nothing if image not available
        //const descriptionText = volumeInfo.description || 'No description available';



        bookElement.innerHTML = `
            <p><strong>Book ${index + 1}:</strong></p>  
            <img src="${item.imageLink}" alt="Book Cover">
            <p><strong>Title:</strong> ${item.title}</p>
            <p><strong>Authors:</strong> ${Array.isArray(item.authors) ? item.authors.join(', ') : item.authors || 'Unknown'}</p>
            <p class="des-fav"><strong>Description</strong><span class ="description"> ${item.description}</span></p>
            
            
            
        `;



        bookResultsDiv.appendChild(bookElement);
        //toggle description
        bookElement.addEventListener('click', toggleDescription);
    });
};








