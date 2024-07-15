const input = document.querySelector("input");
const searchBtn = document.getElementById("search-btn");
const recipeList = document.querySelector(".items");
const recipeDescription = document.querySelector(".recipes");
const ingredientsList = document.createElement("ul");
const instructions = document.createElement("p");

function recipePopUp(element) {
  ingredientsList.innerHTML = "";
  instructions.innerHTML = "";
  recipeDescription.innerHTML = `
  <h2>${element.strMeal}</h2>
  <h3>Ingredients required</h3>`;
  for (let i = 1; i <= 20; i++) {
    ingredient = element[`strIngredient${i}`];
    if (ingredient) {
      let li = document.createElement("li");
      const measure = element[`strMeasure${i}`];
      li.textContent = `${ingredient} - ${measure}`;
      ingredientsList.appendChild(li);
    }
  }
  const h3 = document.createElement("h3");
  h3.textContent = "Instructions";
  recipeDescription.appendChild(ingredientsList);
  instructions.textContent = `${element.strInstructions}`;
  recipeDescription.appendChild(h3);
  recipeDescription.appendChild(instructions);
  console.log(ingredientsList);
  recipeDescription.style.display = "block";
}

async function fetchData(query) {
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  let response = await data.json();
  recipeList.innerHTML = "";
  response.meals.forEach((element) => {
    console.log(element);
    const recipe = document.createElement("div");
    recipe.classList.add("item");
    recipe.innerHTML = `
    <img src=${element.strMealThumb}>
    <h3>${element.strMeal}</h3>
    <h4>${element.strArea}</h4>
    <p>Category: ${element.strCategory}</p>
    `;

    const btn = document.createElement("button");
    recipe.appendChild(btn);
    btn.textContent = "Check recipe";

    btn.addEventListener("click", () => {
      recipePopUp(element);
    });

    recipeList.appendChild(recipe);
  });
}

searchBtn.addEventListener("click", () => {
  fetchData(input.value);
});

window.onload = fetchData(input.value);
