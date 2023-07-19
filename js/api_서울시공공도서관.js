const API_KEY = `%2FaOeCIRdOSq%2BN8KnTB%2FTLIpGR6ALho7ZkY3%2FcrGQM5whuwnJ57%2Ftvv08aharJwEFWbTkeCJiCulN%2BlhUWYi5zQ%3D%3D`

async function getData(){
  const url = `http://openapi-lib.sen.go.kr/openapi/service/lib/openApi/?serviceKey=${API_KEY}&title=도둑$manageCd=MB&numOfRows=5&pageNo=2`
  const response = await fetch(url)
  const data = await response.json();
  console.log('data', data);
}
getData();

// var xhr = new XMLHttpRequest();
// var url = "http://openapi-lib.sen.go.kr/openapi/service/lib/openApi"; /*URL*/
// var queryParams =
//   "?" +
//   encodeURIComponent("serviceKey") +
//   "=" +
//   `%2FaOeCIRdOSq%2BN8KnTB%2FTLIpGR6ALho7ZkY3%2FcrGQM5whuwnJ57%2Ftvv08aharJwEFWbTkeCJiCulN%2BlhUWYi5zQ%3D%3D`; /*Service Key*/
// queryParams +=
//   "&" + encodeURIComponent("title") + "=" + encodeURIComponent("도둑"); /**/
// queryParams +=
//   "&" + encodeURIComponent("manageCd") + "=" + encodeURIComponent("MB"); /**/
// queryParams +=
//   "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("5"); /**/
// queryParams +=
//   "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("2"); /**/
// xhr.open("GET", url + queryParams);
// xhr.onreadystatechange = function () {
//   if (this.readyState == 4) {
//     console.log(
//       "Status: " +
//         this.status +
//         "nHeaders: " +
//         JSON.stringify(this.getAllResponseHeaders()) +
//         "nBody: " +
//         this.responseText
//     );
//   }
// };

// xhr.send('');