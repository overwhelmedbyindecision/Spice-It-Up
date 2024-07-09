const searchButton = document.getElementById('search-button');
const displayEl = document.getElementById('recipe-display');

//random
function getRecipe(event) {
    event.preventDefault();

    const url = "https://api.spoonacular.com/recipes/random?apiKey=0e012fe981584e42aa26cd40242a5244&number=1"
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            console.log(data.recipes[0].sourceUrl)

            displayEl.innerHTML = "";

            const recipeCard = document.createElement('div');

            const recipeImg = document.createElement('img');
            recipeImg.src = data.recipes[0].image;
            const recipeTitle = document.createElement('h1');
            recipeTitle.textContent = data.recipes[0].title;
            const recipeLink = document.createElement('a');
            recipeLink.textContent = data.recipes[0].sourceUrl;
            recipeLink.classList = "button is-info"
            recipeLink.href = data.recipes[0].sourceUrl;

            displayEl.appendChild(recipeCard);
            recipeCard.appendChild(recipeTitle)
            recipeCard.appendChild(recipeImg)
            recipeCard.appendChild(recipeLink)
        })
}

searchButton.addEventListener('click', getRecipe);