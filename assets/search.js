
    function openModal($el) {
      $el.classList.add('is-active');
    }
    const modalForm = document.getElementById('modal');
    function closeModal($el) {
      modalForm.classList.remove('is-active');
    }
  

  
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById("modal");
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
   
    (document.querySelectorAll('search-button, .modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
  });

  const modalButton = document.getElementById('modal-open');
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
    displayEl.innerHTML =" ";
      const searchTerm = document.getElementById('searchterm').ariaValueMax;
      const cuisineSearch = cuisineInput.value;
      const dietSearch = dietInput;

      console.log(searchTerm);
      console.log(cuisineSearch);
      console.log(selectedDiets);
  
      const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=ed127a9fae5c4c2c8e487fa04c31a5f1&query=` 
      + searchInput.value; +
       `&cuisine=` + cuisineSearch + 
       `&diet=` + dietSearch
      
      fetch(url)
          .then(function (response) {
              return response.json();
          }).then(function (data) {
              console.log(data);

              for (let i = 0; i < data.results.length; i++) {
                setTimeout(() => {
                const recipeId =  data.results[i].id
                const recipeUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=ee31c44089f8402ebed393c40e52eac4&includeNutrition=false"
                fetch(recipeUrl)
                .then(function (response) {
                    return response.json();
                  }).then(function (data) {
  
                    const recipeCard = document.createElement('div');
                    recipeCard.classList = "card column is-two-fifth m-2"
                    const lineBreak = document.createElement('br')
                    const recipeImg = document.createElement('img');
                    recipeImg.src = data.image;
                    recipeImg.classList = "content is-medium has-text-centered food-image"
                    const recipeTitle = document.createElement('h1');
                    recipeTitle.classList = "has-text-centered"
                    recipeTitle.textContent = data.title;
                    const recipeLink = document.createElement('a');
                    recipeLink.textContent = data.sourceUrl;
                    recipeLink.classList = "button is-info is-centered has-text-centered"
                    recipeLink.href = data.sourceUrl;
                    recipeLink.target = "_blank";
                    recipeLink.textContent = "Click Me For Recipe";
        
                    displayEl.appendChild(recipeCard);
                    recipeCard.appendChild(recipeTitle)
                    recipeCard.appendChild(lineBreak)
                    recipeCard.appendChild(recipeImg)
                    recipeCard.appendChild(lineBreak)
                    recipeCard.appendChild(recipeLink)
                  
              });
            }, i * 1200)
          }
          })
        };

       function save() {
        for (let i = 0; i < 11; i++) {
        const checkbox = document.getElementById('checkbox-' + [i]);
         localStorage.setItem("checkbox-" + [i], checkbox.checked);
        }
       }
       function load() {
        for (let i = 0; i < 11; i++) {
          const checkbox = document.getElementById('checkbox-' + [i]);
           checkbox.checked = localStorage.getItem("checkbox-" + [i]) === "true";
        }
       }
       
       
  searchButton.addEventListener('click', save);
  searchButton.addEventListener('click', getRecipeSearch);
  searchButton.addEventListener('click', closeModal);
  modalButton.addEventListener('click', load);

