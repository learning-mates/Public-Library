const API_KEY = '%2FaOeCIRdOSq%2BN8KnTB%2FTLIpGR6ALho7ZkY3%2FcrGQM5whuwnJ57%2Ftvv08aharJwEFWbTkeCJiCulN%2BlhUWYi5zQ%3D%3D'

async function getData(){
  const url = `http://openapi-lib.sen.go.kr/openapi/service/lib/openApi?serviceKey=${API_KEY}&title=도둑&manageCd=MB`
  const response = await fetch(url)
  const data = await response.json();
  console.log('data', data);
}
getData();