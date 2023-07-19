const API_KEY = "125a942cee624a03b4a3";

async function getDate() {
  let url = `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/1000/RCP_NM=${cook_search.value}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log("date", data);
}
getDate();
