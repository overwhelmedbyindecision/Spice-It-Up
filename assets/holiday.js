
const apiKey = 'lWPS2BVkfY4lGCB5QAWZ1IQ8ez41awue';
const country = document.getElementById("country");
const year = 2024;
const today = dayjs();
const displayEl = document.getElementById('displayEl');
const holidayListEl = document.createElement("div");
holidayListEl.classList.add("holiday-list");
const recipeContainer = document.createElement("div");
recipeContainer.classList.add("recipe-container");
document.body.appendChild(holidayListEl);
document.body.appendChild(recipeContainer);
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
const getHolidaysForNextWeek = function() {
    displayEl.innerHTML = "";
    holidayListEl.innerHTML = "";
    const requestUrl = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country.value}&year=${year}`;
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        const holidays = data.response.holidays;
        let holidayCount = 0;
        for (const holiday of holidays) {
            if (dayjs(holiday.date.iso) > today && dayjs(holiday.date.iso) < today.add(14, "day")) {
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
                const keywords = ["China", "Chinese", "African", "Korean"];
                const foundKeywords = keywords.filter(keyword => description.includes(keyword));
                if (foundKeywords.length > 0) {
                    const spiceItUpButton = document.createElement("button");
                    spiceItUpButton.textContent = "Spice It Up!";
                    spiceItUpButton.addEventListener("click", function() {
                        alert("Spice it up! You found a holiday related to " + foundKeywords.join(", ") + ". Celebrate it with some " + foundKeywords.join(", ") + " food!");
                        getRecipe(foundKeywords);
                    });
                    holidayCard.appendChild(spiceItUpButton);
                }
                holidayListEl.appendChild(holidayCard);
                holidayCount++;
            }
        }
        if (holidayCount < 5 && country.value !== 'US') {
            const messageEl = document.createElement("p");
            messageEl.textContent = "Want to celebrate it with some yummy food?";
            messageEl.style.color="#85371C"; 
            messageEl.style.backgroundColor="wheat";
            messageEl.style.width="30vw";
            messageEl.style.fontWeight ="bold";
            const recipeButton = document.createElement("button");
            recipeButton.textContent = "Click for Recipe";
            recipeButton.addEventListener("click", function() {
                tryRecipe(cuisineMapping[country.value]);
            });
            recipeContainer.innerHTML = ""; 
            recipeContainer.appendChild(messageEl);
            recipeContainer.appendChild(recipeButton);
        } else if (country.value=="US") {
            recipeContainer.innerHTML = ""; 
        }
    });
}



function getRecipe(keywords) {
    const APIKey2 = "8a5efc5976a14aa9bcd9d4e58dfab06a";
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=0e012fe981584e42aa26cd40242a5244&cuisine=${keywords}`;
    
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log("food");
            console.log(data);
            displayEl.innerHTML = "";
            const recipeEl = document.getElementById('recipeEl');
            recipeEl.innerHTML = "";
            const recipeCard = document.createElement('div');
            recipeCard.classList = "box card has-text-centered";
            const lineBreak = document.createElement('br');
            const recipeImg = document.createElement('img');
            recipeImg.src = data.results[0].image;
            recipeImg.classList = "content is-large has-text-centered food-image";
            const recipeTitle = document.createElement('h1');
            recipeTitle.textContent = data.results[0].title;
            recipeTitle.classList = "has-text-centered";
            recipeTitle.style.color="#85371C";
            recipeTitle.style.backgroundColor="wheat";
            recipeTitle.style.fontWeight="bold";
            recipeTitle.style.padding="3px";
            const idnum = data.results[0].id;
            const recipeLink = document.createElement('a');
            getLink(idnum, recipeLink);
            recipeLink.classList = "button is-info is-centered has-text-centered";
            recipeLink.href = data.results[0].sourceUrl;
            displayEl.appendChild(recipeCard);
            recipeCard.appendChild(recipeTitle)
            recipeCard.appendChild(lineBreak)
            recipeCard.appendChild(recipeImg)
            recipeCard.appendChild(lineBreak)
            recipeCard.appendChild(recipeLink)
        });
}


const getLink = function(idnum, recipeLink) {
    console.log(idnum, recipeLink);
    const url2 = `https://api.spoonacular.com/recipes/${idnum}/information?apiKey=8a5efc5976a14aa9bcd9d4e58dfab06a`;
    
    fetch(url2)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
            recipeLink.textContent = "Click here to get the recipe";
            recipeLink.classList = "button is-info";
            recipeLink.href = data.sourceUrl;
        });
}

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
            const recipeCard = document.createElement('div');
            recipeCard.classList = "box card has-text-centered";
            const lineBreak = document.createElement('br');
            const recipeImg = document.createElement('img');
            recipeImg.src = data.results[0].image;
            recipeImg.classList = "content is-large has-text-centered food-image";
            const recipeTitle = document.createElement('h1');
            recipeTitle.textContent = data.results[0].title;
            recipeTitle.classList = "has-text-centered";
            recipeTitle.style.color="#85371C";
            recipeTitle.style.backgroundColor="wheat";
            recipeTitle.style.fontWeight="bold";
            recipeTitle.style.padding="3px";
            const idnum = data.results[0].id;
            const recipeLink = document.createElement('a');
            getLink(idnum, recipeLink);
            recipeLink.classList = "button is-info is-centered has-text-centered";
            recipeLink.href = data.results[0].sourceUrl;
            displayEl.appendChild(recipeCard);
            recipeCard.appendChild(recipeTitle)
            recipeCard.appendChild(lineBreak)
            recipeCard.appendChild(recipeImg)
            recipeCard.appendChild(lineBreak)
            recipeCard.appendChild(recipeLink)


        });
}