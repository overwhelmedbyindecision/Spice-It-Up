document.addEventListener('DOMContentLoaded', () => {
//     // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  

  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById("modal");
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
//     // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
//     // Add a keyboard event to close all modals
//     document.addEventListener('keydown', (event) => {
//       if(event.key === "Escape") {
//         closeAllModals();
//       }
//     });
  });

  const searchButton = document.getElementById('search-button');
  const displayEl = document.getElementById('recipe-display');
  let searchInput = document.getElementById('searchterm');
  
  //random
  function getRecipeSearch(event) {
      event.preventDefault();
      const searchTerm = document.getElementById('searchterm').ariaValueMax;
  
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=ee31c44089f8402ebed393c40e52eac4&cuisine=` + searchInput.value;
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
  
  
  
  searchButton.addEventListener('click', getRecipeSearch);