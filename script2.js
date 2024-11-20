// Select the container and button elements from the DOM
const container = document.getElementById("container");
const button = document.getElementById("button");

// Add a click event listener to the button
button.addEventListener("click", () => {
    // Define an async function to fetch and display posts
    async function fetching() {
        try {
            container.innerHTML = 'Loading...'; // Notify the user that data is being fetched

            // Fetch posts data from the API
            const response = await fetch("https://dummyjson.com/posts");

            // Parse the response into JSON format
            const dataset = await response.json();

            // Extract the array of posts from the dataset
            let datas = dataset.posts;
            let i = 0; // Initialize index to track the current post

            // Clear the container and reset its color
            container.innerHTML = '';
            container.style.color = "white";

            // Function to display each post sequentially
            function nextPost() {
                if (i < datas.length) {
                    // Call the typer function to type the current post
                    typer(datas[i].body, nextPost);
                    i++; // Increment the index for the next post
                }
            }

            nextPost(); // Start displaying posts
        } catch (error) {
            // Handle errors during fetching
            container.innerHTML = error; // Display the error message
            container.style.color = "red"; // Highlight the error in red
            // Optionally retry fetching after a delay (uncomment if needed)
            // setTimeout(fetching, 1000);
        }
    }

    // Call the fetching function to start fetching and displaying posts
    fetching();
});

// Function to create a typing effect for displaying text
function typer(text, nextPost) {
    let i = 0; // Initialize index to track the current character

    // Function to type characters one by one
    function charTyping() {
        if (i < text.length) {
            container.innerHTML += text.charAt(i); // Append one character at a time
            i++; // Increment the character index
            setTimeout(charTyping, 2); // Adjust typing speed (2ms delay)
            scrolltoLatest(); // Ensure the latest content is visible
        } else {
            // After the text is fully displayed
            setTimeout(() => {
                container.innerHTML += `<br><br>`; // Add spacing between posts
                nextPost(); // Call the next post to display
                scrolltoLatest(); // Scroll to the latest content
            }, 1000); // 1-second delay before showing the next post
        }
    }

    charTyping(); // Start typing effect
}

// Function to scroll the container to the latest content
function scrolltoLatest() {
    container.scrollTop = container.scrollHeight;
}
