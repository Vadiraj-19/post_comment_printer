const container = document.querySelector("#container"); // Select the container element
const button = document.querySelector("#button"); // Select the button element

// Task 2: Define a delay function
function delay(posts) {
    setTimeout(posts, 5000); // Delay time of 5 seconds
}

button.addEventListener('click', () => {
    // Event listener for button click
    container.textContent = "wait for 5sec"; // Inform user to wait

    let p = () => {
        // Callback function to be executed after delay
        container.textContent = "cb executed after 5 sec";
    };

    delay(p); // Call delay with the callback
});

function simulateandFetch(callback) {
    // Simulates delay and fetches data from an API
    setTimeout(() => {
        // Delay of 5 seconds before fetching data
        fetch("https://dummyjson.com/posts")
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                callback(data.posts); // Pass fetched posts to the callback
            })
            .catch((e) => {
                // Handle errors during fetch
                container.textContent = "Error: " + e; // Display error message
                container.style.color = "red"; // Change text color to red
            });
    }, 5000); // Delay time of 5 seconds
}

button.addEventListener("click", () => {
    // Event listener for button click
    container.textContent = ''; // Clear the container
    container.style.color = "white"; // Reset text color
    container.textContent = "wait for 5sec"; // Inform user to wait

    const dataset = (posts) => {
        // Callback to handle posts data
        let postIndex = 0; // Index of the current post
        container.textContent = ''; // Clear the container

        function showNextPost() {
            // Display posts one by one
            if (postIndex < posts.length) {
                let postBody = posts[postIndex].body; // Get the body of the current post

                header.innerHTML = ""; // Clear the header before typing new text
                data(postBody, () => {
                    // Call the typing function with the post body
                    postIndex++; // Move to the next post
                    showNextPost(); // Recursively call to show the next post
                });
            }
        }

        showNextPost(); // Start showing posts
    };

    simulateandFetch(dataset); // Fetch posts and pass dataset as callback
});

function data(text, callback) {
    // Function to type out text with a typing effect
    let i = 0; // Index of the current character

    function typing() {
        // Function to type out one character at a time
        if (i < text.length) {
            container.innerHTML += text.charAt(i); // Append one character at a time
            i++; // Increment the index
            container.scrollTop = container.scrollHeight; // Scroll to the latest text
            setTimeout(typing, 5); // Call the function again after 5ms
        } else {
            container.innerHTML += `<br><br>`; // Add line breaks between posts
            container.scrollTop = container.scrollHeight; // Ensure scroll position is updated

            setTimeout(callback, 1000); // Wait 1 second before calling the next post
        }
    }

    typing(); // Start typing effect
}
