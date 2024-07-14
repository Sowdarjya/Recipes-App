const input = document.querySelector("input");
const searchBtn = document.getElementById("search-btn");
const recipeList = document.querySelector(".items");

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
    <button>Learn More</button>
    `;
    recipeList.appendChild(recipe);
  });
}

searchBtn.addEventListener("click", () => {
  fetchData(input.value);
});

window.onload = fetchData(input.value);
