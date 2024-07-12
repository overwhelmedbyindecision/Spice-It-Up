
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  

  
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById("modal");
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
   
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
  });

  const searchButton = document.getElementById('search-button');
  const displayEl = document.getElementById('recipe-display');
  let searchInput = document.getElementById('searchterm');
  let cuisineInput = document.getElementById('cuisine-term');
  const selectedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const selectedDiets = Array.from(selectedBoxes).map(checkbox => checkbox.value);
  const dietInput = selectedDiets.join(",");
  
  //random
  function getRecipeSearch(event) {
    event.preventDefault()
      const searchTerm = document.getElementById('searchterm').ariaValueMax;
      const cuisineSearch = cuisineInput.value;
      const dietSearch = dietInput;

      console.log(searchTerm);
      console.log(cuisineSearch);
      console.log(selectedDiets);
  
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=ee31c44089f8402ebed393c40e52eac4&query=` 
      + searchInput.value; +
       `&cuisine=` + cuisineSearch + 
       `&diet=` + dietSearch +
       `&number=5`
      
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
              recipeImg.classList = "content is-medium has-text-centered food-image"
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
  
  };
  
  
  
  searchButton.addEventListener('click', getRecipeSearch);
