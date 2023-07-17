const API_KEY = '125a942cee624a03b4a3'


async function getDate() {
    const url = 'http://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/1/5'
    const response = await fetch(url);
    const data = await response.json();
    console.log("date",data.COOKRCP01.row[0])
}
getDate()

