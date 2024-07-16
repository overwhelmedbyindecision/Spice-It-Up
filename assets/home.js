const footerEl = document.getElementById('footer')

function getTrivia(event) {

    const url = "https://api.spoonacular.com/food/trivia/random?apiKey=ed127a9fae5c4c2c8e487fa04c31a5f1&"
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);

            const trivia = document.createElement('h5');
            trivia.classList = "has-text-centered";
            trivia.textContent = data.text;
            trivia.style.color="#85371C";
            trivia.style.backgroundColor="wheat"
            trivia.style.margin="auto"
            trivia.style.fontWeight ="bold";
            footerEl.appendChild(trivia);
        })
    };

    window.onload = function() {
        getTrivia();
       };