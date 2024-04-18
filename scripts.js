const form = document.querySelector("form");
const gifSection = document.querySelector('#gif-section');
const removeButton = document.querySelector('#remove-button');
const API_KEY = document.querySelector('#api-key').value;


form.addEventListener("submit", async (e) => {
    // prevent default
    e.preventDefault();

    // Get search term from html file
    const searchTerm = document.querySelector("#search_term").value;
    console.log(`API Key: ${API_KEY}`);
    // Get results from session storage or from API call if not in sessionStorage
    let res = JSON.parse(sessionStorage.getItem(searchTerm)) || await axios({
        method: "get",
        url: "http://api.giphy.com/v1/gifs/search",
        params: {
            q: searchTerm,
            api_key: "test",
            rating: 'g'
        }
    });

    // Update sessionStorage
    sessionStorage.setItem(searchTerm, JSON.stringify(res));
    
    // Array with each result
    let results = res.data.data;
    
    // Generate a number to serve as the index for array of returned gifs
    let r = Math.floor(Math.random() * results.length);

    // Create the new img element
    let newGif = document.createElement("img");

    // Set src attribute to the gif URL
    newGif.src = results[r].images.original.url;

    // Set the alt text to the title of the gif from giphy
    newGif.alt = results[r].title;

    // Prepend the gif to the gif section
    gifSection.prepend(newGif);
});

removeButton.addEventListener("click", () => {
    gifSection.innerHTML = ""
});