


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

//delete book from favoutite


const removeBook = async (book) => {
    try {
        const response = await fetch(`${favAPI}/favourite/${book.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            alert('book removed');
            data = data.filter(item => item.id !== book.id); //update the data after deletion
            displayBookResults(data); //calling the displayBookResults to update the display after deletion
        } else {
            alert('failed to remove');
        }
    } catch (error) {
        console.log("error removing", error);
    }
};




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
        //adding the delete button to each article
        const delButton = document.createElement('button');  //creating the delete button
        delButton.classList.add("delButton"); //giving class to del button  
        delButton.setAttribute('data-book-id', item.id); //set data-book-id to item.id
        delButton.textContent = 'Delete'; //setting the button's text content 
        const bookElement = document.createElement('article');
        bookElement.classList.add('bookArticle'); //giving class to articles
        bookElement.innerHTML = `
            <p><strong>Book ${index + 1}:</strong></p>  
            <img src="${item.imageLink}" alt="Book Cover">
            <p><strong>Title:</strong> ${item.title}</p>
            <p><strong>Authors:</strong> ${Array.isArray(item.authors) ? item.authors.join(', ') : item.authors || 'Unknown'}</p>
            <p class="des-fav"><strong>Description</strong><span class ="description"> ${item.description}</span></p>
        `;

        delButton.addEventListener('click', async (event) => {
            event.stopPropagation();   // Prevent the click event from triggering the bookElement click event
            const bookId = event.currentTarget.getAttribute("data-book-id");
            const book = data.find(item => item.id === bookId);
            if (book) {
                removeBook(book);
            }
        });



        bookElement.appendChild(delButton);
        bookResultsDiv.appendChild(bookElement);
        //toggle description
        bookElement.addEventListener('click', toggleDescription);
    });
};








