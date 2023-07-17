const API_KEY = `%2FaOeCIRdOSq%2BN8KnTB%2FTLIpGR6ALho7ZkY3%2FcrGQM5whuwnJ57%2Ftvv08aharJwEFWbTkeCJiCulN%2BlhUWYi5zQ%3D%3D`

async function getData(){
  const url = `https://api.odcloud.kr/api/15071311/v1/uddi:75461a18-17a3-42fe-9322-a51148003b69?page=1&perPage=10&returnType=JSON&serviceKey=${API_KEY}`
  const response = await fetch(url)
  const data = await response.json();
  console.log('data', data);
}
getData();