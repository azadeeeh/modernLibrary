// fetchExample.js

// Import the 'node-fetch' library for making fetch requests in Node.js
const fetch = require('node-fetch');

// Function to perform the fetch request
async function testFetch() {
    try {
        // Replace the URL with the actual API endpoint or resource you want to fetch
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Log the data to the console
        console.log('Fetch successful:', data);
    } catch (error) {
        console.error('Fetch failed:', error.message);
    }
}

// Call the testFetch function
testFetch();
