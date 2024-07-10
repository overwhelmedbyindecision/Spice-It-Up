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
            recipeCard.classList = "box card"
            const lineBreak = document.createElement('br')
            const recipeImg = document.createElement('img');
            recipeImg.src = data.recipes[0].image;
            recipeImg.classList = "content is-large has-text-centered food-image"
            const recipeTitle = document.createElement('h1');
            recipeTitle.classList = "has-text-centered"
            recipeTitle.textContent = data.recipes[0].title;
            const recipeLink = document.createElement('a');
            recipeLink.textContent = data.recipes[0].sourceUrl;
            recipeLink.classList = "button is-info is-centered has-text-centered"
            recipeLink.href = data.recipes[0].sourceUrl;

            displayEl.appendChild(recipeCard);
            recipeCard.appendChild(recipeTitle)
            recipeCard.appendChild(lineBreak)
            recipeCard.appendChild(recipeImg)
            recipeCard.appendChild(lineBreak)
            recipeCard.appendChild(recipeLink)
        })

}



searchButton.addEventListener('click', getRecipe);