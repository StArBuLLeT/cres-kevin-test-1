const Http = new XMLHttpRequest();
const url = 'http://localhost:3001/recipes';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = () => {
    if (Http.readyState === 4 && Http.status === 200) {
        document.getElementById('loading').style.display = 'none';
        const recipes = JSON.parse(Http.responseText);
        recipes.forEach(recipe => {
            const recipeNameAccordion = document.createElement("button");
            recipeNameAccordion.className = 'accordion'
            recipeNameAccordion.appendChild(document.createTextNode(`${recipe.title} ~ ${recipe.description }`));
            document.getElementById('accordion-container').appendChild(recipeNameAccordion);

            const recipePanelAccordion = document.createElement("div");
            recipePanelAccordion.className = 'panel';
            document.getElementById('accordion-container').appendChild(recipePanelAccordion);

            const image = document.createElement("img");
            image.className = 'recipe-image';
            image.src = `http://localhost:3001${recipe.images.full}`
            recipePanelAccordion.appendChild(image);

            const recipeIngredientsInfo = document.createElement("p");
            recipeIngredientsInfo.appendChild(document.createTextNode('Ingredients:')
            );
            recipePanelAccordion.appendChild(recipeIngredientsInfo);

            const ingredientList = document.createElement("ul");
            recipePanelAccordion.appendChild(ingredientList);

            recipe.ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(`${ingredient.amount} ${ingredient.measurement} of ${ingredient.name}`));
                ingredientList.appendChild(li);
            });
        }); 

        const acc = document.getElementsByClassName("accordion");
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                panel.style.display = "none";
                } else {
                panel.style.display = "block";
                }
            });
        }
    }
}