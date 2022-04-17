function getUserDataProfile(url) {
  return parseJSON(apiGET(url))
}

function apiGET(url) {
  let request = new XMLHttpRequest()
  request.open("GET", url, false)
  request.send()
  return request.responseText
}

function parseJSON(res) {
  let user = JSON.parse(res)
  return user
}

function main() {
  const user_obj = getUserDataProfile("http://api.github.com/users/birobirobiro")
  const user_name = document.querySelector('.user-name')
  
  const profile_pic = document.querySelector('.profile-picture>img')
  const followers = document.querySelector('.text-followers')
  const following = document.querySelector('.text-following')
  const repos = document.querySelector('.text-repos')
  const company = document.querySelector('.text-company')
  const location = document.querySelector('.text-location')


  user_name.innerHTML = user_obj.login
  profile_pic.src = user_obj.avatar_url
  followers.innerHTML = user_obj.followers
  following.innerHTML = user_obj.following
  repos.innerHTML = user_obj.public_repos
  company.innerHTML = user_obj.company
  location.innerHTML = user_obj.location
  
}

main()
