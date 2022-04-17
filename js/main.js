async function getProfileInfos(username) {
  const url = `https://api.github.com/users/${username}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json'
    }
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

async function init(username) {
  const promise = await getProfileInfos(username);
  Promise.all([promise]).then(([user]) => {
    console.log(user)
    render({
      name: user.login,
      followers: user.followers,
      following: user.following,
      repository: user.public_repos,
      company: user.company,
      location: user.location,
      image: user.avatar_url,
    });
  });
}

const cardContainer = document.querySelector(".card-container")

function render(user) {

  const map = new Map();
  map.set("followers", "Seguidores");
  map.set("following", "Seguindo");
  map.set("repository", "Repositórios");
  map.set("company", "");
  map.set("location", "");

  const profileCard = document.createElement("div");
  
  const cardHeader = document.createElement("header")
  const rocketPin = document.createElement("span");
  const headerRocket = document.createElement("img")
  const userName = document.createElement("h2");

  const profileDataContainer = document.createElement("main");

  const profilePhotoContainer = document.createElement("div");
  const profileImg = document.createElement("img");

  const infoListContainer = document.createElement("div")
  const profileInfoList = document.createElement("ul");
  const infoItem = document.createElement("li");
  const infoItemImage = document.createElement("img");
  const infoTextspan = document.createElement("span");

  const cardFooter = document.createElement("footer");
  const footerSpan = document.createElement("span");
  const footerRocket = document.createElement("img");
  const { name, image, ...rest } = user;

  // set atributes
  headerRocket.setAttribute("src", "./assets/logo.svg");
  headerRocket.setAttribute("alt", "Rocketseat");
  profileImg.setAttribute("src", String(image));
  profileImg.setAttribute("alt", `${String(name)}.png`);
  footerRocket.setAttribute("src", "./assets/logo.svg");
  footerRocket.setAttribute("alt", "Rocketseat");

  // set classes
  cardContainer.setAttribute("class", "card-container")
  profileCard.setAttribute("class", "profile-card")
  rocketPin.setAttribute("class", "rocket-pin")
  userName.setAttribute("class", "user-name")
  profileDataContainer.setAttribute("class", "profile-data-container")
  profilePhotoContainer.setAttribute("class", "profile-photo")
  infoListContainer.setAttribute("class", "info")
  cardFooter.setAttribute("class", "card-footer")

  userName.textContent = String(name);
  footerSpan.innerText = "rocketcard";


  const arrayInfoItem = Object.entries(rest);
  const listColection = arrayInfoItem.map(([key, value]) => {
    let li = infoItem.cloneNode();
    let image = infoItemImage.cloneNode();
    let span = infoTextspan.cloneNode();
    image.src = `./assets/${key}.svg`;
    span.setAttribute("class", `text-${key}`)
    span.textContent = `${value} ${map.get(key)}`;
    li.appendChild(image);
    li.appendChild(span);
    return li;
  });


  profileCard.appendChild(cardHeader)

    cardHeader.appendChild(rocketPin)
      rocketPin.appendChild(headerRocket)
    cardHeader.appendChild(userName)

  profileCard.appendChild(profileDataContainer)  

    profileDataContainer.appendChild(profilePhotoContainer)
      profilePhotoContainer.appendChild(profileImg)
    profileDataContainer.appendChild(infoListContainer)
      infoListContainer.appendChild(profileInfoList)
        profileInfoList.append(...listColection)

  profileCard.appendChild(cardFooter)

    cardFooter.appendChild(footerSpan)
      footerSpan.appendChild(footerRocket)    
  
  cardContainer.appendChild(profileCard)
        
}

init('birobirobiro')


function randomColor() {

  let color = `rgb(
    ${Math.floor(Math.random()*256)},
    ${Math.floor(Math.random()*256)},
    ${Math.floor(Math.random()*256)}
  )`

  return color
}


const change_BgColor_btn = document.querySelector('.change-bgColor-btn')
change_BgColor_btn.addEventListener('click', () => { 
  cardContainer.style.backgroundColor = randomColor()
})

const colorPickerInput = document.querySelector('#color-input')
colorPickerInput.addEventListener('input', () => {
  cardContainer.style.backgroundColor = colorPickerInput.value
})
