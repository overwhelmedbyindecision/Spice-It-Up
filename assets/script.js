const searchButton = document.getElementById('search-button');
const searchTermEl = document.getElementById('keywords');

// //random
// function getRecipe(event) {
//     event.preventDefault();

 

//     const url = "https://api.spoonacular.com/recipes/random?apiKey=0e012fe981584e42aa26cd40242a5244&number=1"
//     fetch(url)
//       .then(function (response) {
//         return response.json();
//       }).then(function (data) {
//         console.log(data);
//         console.log(data.recipes[0].sourceUrl)
//       })
  
// }
// queried
function getRecipe(event) {
    event.preventDefault();

    let searchTerm = searchTermEl.value

    const url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=0e012fe981584e42aa26cd40242a5244&&query=" + searchTerm + "&number=5"
    fetch(url)
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data)
      
      for (let i = 0; i < data.results.length; i++) {
        const recipeId =  data.results[i].id
        const recipeUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=$0e012fe981584e42aa26cd40242a5244"
        fetch(recipeUrl)
        .then(function (response) {
            return response.json();
          }).then(function (data) {
            console.log(data)
      });
      }
    })
}

//featured
// function getRecipe(event) {
//     event.preventDefault();

 

//     const url = "https://api.spoonacular.com/recipes/random?apiKey=0e012fe981584e42aa26cd40242a5244&number=1"
//     fetch(url)
//       .then(function (response) {
//         return response.json();
//       }).then(function (data) {
//         console.log(data);
//         console.log(data.recipes[0].sourceUrl)
//       })
  
// }


searchButton.addEventListener('click', getRecipe);
