import { cardTemplate, endTemplate, errorTemplate } from "./utils/templates.js"

const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const handleHtmlTemplate = characters => {
  const output = characters.map(character => cardTemplate(character)).join('');
  const newItem = document.createElement('section');
  newItem.classList.add('Items');
  newItem.innerHTML = output;
  $app.appendChild(newItem);
}

const handleLocalStorage = url => {
  localStorage.setItem('next_fetch', url);
}

const getData = async api => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    const characters = data.results;
    const url = data.info.next;

    if (url) {
      handleHtmlTemplate(characters);
      handleLocalStorage(url);
    } else {
      const newItem = document.createElement('section');
      newItem.innerHTML = endTemplate();
      $app.appendChild(newItem);
      intersectionObserver.unobserve($observe);
    }

  } catch (error) {
    console.log(error);
    const newItem = document.createElement('section');
    newItem.innerHTML = errorTemplate();
    $app.appendChild(newItem);
  }
}

const loadData = () => {
  const localURL = localStorage.getItem('next_fetch');
  const fetchURL = localURL ? localURL : API;
  getData(fetchURL);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

localStorage.clear();
intersectionObserver.observe($observe);