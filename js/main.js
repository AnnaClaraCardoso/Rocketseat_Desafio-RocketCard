function apiGET(url) {
  let request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.send()
  return request.responseText
}

function main() {
  let data = apiGET("http://api.github.com/users/birobirobiro");
  let user = JSON.parse(data);
  console.log(user)
}

main()