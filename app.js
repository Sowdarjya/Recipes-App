async function fetchData() {
  let data = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
  );
  let response = await data.json();
  console.log(response);
}

fetchData();
