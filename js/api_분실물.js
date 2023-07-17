const API_KEY = `4267457945796d6a3733794a4f7672`

async function getData(){
  const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/lostArticleInfo/1/1000/`
  const response = await fetch(url)
  const data = await response.json();
  console.log('data', data);
}
getData();