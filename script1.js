// Select the button and container elements from the DOM
const button = document.querySelector("#button");
const container = document.querySelector("#container");

// Add a click event listener to the button
button.addEventListener("click", () => {
    // Display a loading message while fetching data
    container.innerHTML = 'Loading...';

    // Function to handle fetching posts and displaying them sequentially
    function promis() {
        let i = 0; // Initialize an index to keep track of the current post

        // Create a Promise to fetch posts from the API
        let promise = new Promise(function (resolve, reject) {
            fetch("https://dummyjson.com/posts") // Fetch data from API
                .then(resolve) // Resolve the promise on success
                .catch(reject); // Reject the promise if an error occurs
        });

        // Handle the resolved or rejected promise
        promise
            .then(d => d.json()) // Parse the JSON data
            .then(d => {
                let data = d.posts; // Extract posts from the API response
                console.log(data); // Log the data for debugging purposes

                // Clear the loading message and reset container style
                container.innerHTML = '';
                container.style.color = "white";

                // Function to display the next post using the typing effect
                function nextpost() {
                    if (i < data.length) {
                        Typer(data[i].body, nextpost); // Type the current post body
                        i++; // Increment the index for the next post
                    }
                }

                nextpost(); // Start displaying posts
            })
            .catch(() => {
                // Handle fetch errors (e.g., network issues)
                container.innerHTML = "Operation timed out"; // Display error message
                container.style.color = "red"; // Highlight the error in red
            });
    }

    // Function to create a typing effect for displaying text
    function Typer(text, nextpost) {
        let i = 0; // Initialize an index to keep track of the current character

        // Function to type characters one by one
        function typing() {
            if (i < text.length) {
                // Append the next character to the container
                container.innerHTML += text.charAt(i); 
                i++; // Move to the next character
                scrollToLatest(); // Scroll to the latest content
                setTimeout(typing, 2); // Call the function again with a delay
            } else {
                // Once the text is fully displayed
                setTimeout(() => {
                    scrollToLatest(); // Ensure the latest content is visible
                    container.innerHTML += `</br></br>`; // Add line breaks between posts
                    nextpost(); // Call the next post function
                }, 1000); // Wait 1 second before moving to the next post
            }
        }

        typing(); // Start typing the text
    }

    // Function to ensure the latest content is visible by scrolling
    function scrollToLatest() {
        container.scrollTop = container.scrollHeight; // Scroll to the bottom of the container
    }

    promis(); // Start the promise chain to fetch and display posts
});
