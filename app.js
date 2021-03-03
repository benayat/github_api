// const fetch = require('node-fetch');

// const { rejects } = require('assert');

// const fs = require('fs');
const userCardData = new Map();
const endPoint = 'https://api.github.com/users/';
async function getUser(userNamePath) {
  const response = await fetch(userNamePath);
  const data = await response.json();
  if (!data.login) {
    throw Error('username not found');
  }
  const cardData = {
    profileImage: data.avatar_url,
    name: data.login,
    numberOfPublicRepositories: data.public_repos,
    followers: data.followers_url,
    numberOfFollowers: data.followers,
  };
  return cardData;
}

function appllySearchBar() {
  const errorShow = document.createElement('p');
  errorShow.classList.add('errorShow');
  errorShow.innerHTML = ``;
  const searchBarHTML = `    <div class=searchBar>
  <input type="text" placeholder="Search.." name="search">
  <button type="button" class = "searchUser">search</button>
  </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', searchBarHTML);
  document.body.insertAdjacentElement('beforeend', errorShow);
  const searchButton = document.querySelector('.searchUser');
  const textSearch = document.querySelector('input[type=text]');
  searchButton.addEventListener('click', searchHandler);
  textSearch.addEventListener('keyup', (event) => {
    debugger;
    if (event.key === 'Enter') {
      document.querySelector('.searchUser').click();
      event.target.value = '';
    }
  });
}

function applyCardHTML(cardData) {
  const cardHTML = `<div class = "cardwrapper">
  <img src="${cardData.profileImage}" alt="Avatar" style="width:100%">
  <div class = "user_data">
  <p>name: ${cardData.name}</p>
  <p>number of repositories: ${cardData.numberOfPublicRepositories}</p>
  <a href= ${cardData.followers_url}>folowers: ${cardData.numberOfFollowers}</a>
  </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', cardHTML);
}
async function searchHandler(event) {
  debugger;
  document.querySelector('.errorShow').innerHTML = ``;

  const textArea = event.target.previousElementSibling.value;
  const userPath = `${endPoint}${textArea}`;

  try {
    const cardData = await getUser(userPath);
    if (userCardData.has(cardData.name)) {
      throw Error('item already exists. just see in the page');
    } else {
      userCardData.set(cardData.name, cardData);
      applyCardHTML(cardData);
    }
  } catch (error) {
    document.querySelector('.errorShow').innerHTML = error;
  }
}

async function go() {
  appllySearchBar();
}
go();
