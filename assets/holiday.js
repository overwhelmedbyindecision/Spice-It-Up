const apiKey = 'OeSQJ9j84okDmT4z3cx3jGJfpYhTKCr8';

// backup apiKey lWPS2BVkfY4lGCB5QAWZ1IQ8ez41awue

const country = document.getElementById("country");
const year = 2024;
const today = dayjs();


$(document).ready(function() {
    getHolidaysForNextWeek();
  });

  const cuisineMapping = {
    'US': 'American',
    'CN': 'Chinese',
    'JP': 'Japanese',
    'IN': 'Indian',
    'KR': 'Korean',
    'FR': 'French',
    'GR': 'Greek',
    'DE': 'German',
    'MX': 'Mexican',
    'BS': 'Bahamian',
    'CU': 'Cuban'
};

const getHolidaysForNextWeek=function(){

    const displayEl = document.getElementById('displayEl');
    if (displayEl) {
        displayEl.innerHTML = "";
    }

    const existingHolidayList = document.querySelector(".holiday-list");
    if (existingHolidayList) {
        existingHolidayList.remove();
    }

    const requestUrl = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country.value}&year=${year}`;
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
      })
    .then(
       
        function (data) {
            console.log(data);
            const holidays = data.response.holidays;
            const holidayList = document.createElement("div");
            holidayList.classList.add("holiday-list"); 
            let holidayCount = 0;

            for (const holiday of holidays){
                if (dayjs(holiday.date.iso)>today && dayjs(holiday.date.iso)<today.add(14,"day")) {
            const holidayCard = document.createElement("div");
            holidayCard.classList.add("holiday-card"); 

            const cardHeader = document.createElement("h3");
            const cardDate = dayjs(holiday.date.iso).format("MMM-DD"); 
            cardHeader.textContent = cardDate;
            holidayCard.appendChild(cardHeader);

            const cardDesc = document.createElement("h4");
            cardDesc.textContent = holiday.name;
            holidayCard.appendChild(cardDesc);

            const cardDescFull = document.createElement("p");
            cardDescFull.textContent = `Description: ${holiday.description}`;
            holidayCard.appendChild(cardDescFull);
            
            const description = holiday.description;
            const keywords = ["China", "Chinese", "African"];
            const foundKeywords = keywords.filter(keyword => description.includes(keyword));

            if (foundKeywords.length > 0) {
                const spiceItUpButton = document.createElement("button");
                spiceItUpButton.textContent = "Spice It Up!";
                spiceItUpButton.addEventListener("click", function() {
                    alert("Spice it up! You found a holiday related to " + foundKeywords.join(", ")+". Celebrate it with some " +foundKeywords+ " food!");
                    getRecipe(foundKeywords);
                });
                holidayCard.appendChild(spiceItUpButton);
            }

            holidayList.appendChild(holidayCard);
            }
        }
        document.body.appendChild(holidayList);

        if (holidayCount < 5 && country.value !== 'US') {
            tryRecipe(cuisineMapping[country.value]);
        }
    }
);
    
}        


function getRecipe(keywords) {
    const APIKey2="8a5efc5976a14aa9bcd9d4e58dfab06a";
    const url =`https://api.spoonacular.com/recipes/complexSearch?apiKey=0e012fe981584e42aa26cd40242a5244&cuisine=${keywords}`;
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log("food");
            console.log(data);
            displayEl.innerHTML = "";
            const recipeCard = document.createElement('div');
            const recipeImg = document.createElement('img');
            recipeImg.src = data.results[0].image;
            const recipeTitle = document.createElement('h1');
            recipeTitle.textContent = data.results[0].title;
            const idnum=data.results[0].id;
            const recipeLink = document.createElement('a');
            getLink(idnum,recipeLink);
            recipeLink.classList = "button is-info";
            recipeLink.href = data.results.sourceUrl;
            displayEl.appendChild(recipeCard);
            recipeCard.appendChild(recipeTitle);
            recipeCard.appendChild(recipeImg);
            recipeCard.appendChild(recipeLink);
        })
    }
        const getLink=function(idnum, recipeLink) {
            console.log(idnum,recipeLink);
            const url2 =`https://api.spoonacular.com/recipes/${idnum}/information?apiKey=8a5efc5976a14aa9bcd9d4e58dfab06a`;
        fetch(url2) 
            .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            recipeLink.textContent = data.sourceUrl;
            recipeLink.classList = "button is-info";
            recipeLink.href = data.sourceUrl;
        })}


        function tryRecipe(cuisineKeyword) {
            const APIKey = "8a5efc5976a14aa9bcd9d4e58dfab06a";
            const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKey}&cuisine=${cuisineKeyword}`;
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log("Recipes:");
                    console.log(data);
                    
                    const recipeEl = document.getElementById("recipeEl");
                    recipeEl.innerHTML = "";
        
                    if (data.results.length > 0) {
                        const recipeCard = document.createElement("div");
                        recipeCard.classList.add("recipe-card");
        
                        const recipeImg = document.createElement("img");
                        recipeImg.src = data.results[0].image;
                        recipeCard.appendChild(recipeImg);
        
                        const recipeTitle = document.createElement("h3");
                        recipeTitle.textContent = data.results[0].title;
                        recipeCard.appendChild(recipeTitle);
        
                        const recipeLink = document.createElement("a");
                        recipeLink.href = data.results[0].sourceUrl;
                        recipeLink.textContent = "View Recipe";
                        recipeLink.classList.add("button", "is-info");
                        recipeCard.appendChild(recipeLink);
        
                        recipeEl.appendChild(recipeCard);
                    } else {
                        const noRecipeMsg = document.createElement("p");
                        noRecipeMsg.textContent = "No recipes found.";
                        recipeEl.appendChild(noRecipeMsg);
                    }
                })
        }