const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';

const cardTemplate = character => `
  <article class="Card">
    <img src="${character.image}" />
    <h2>${character.name}<span>${character.species}</span></h2>
  </article>
  `

const handleHtmlTemplate = characters => {
  let output = characters.map(character => cardTemplate(character)).join('');
  let newItem = document.createElement('section');
  newItem.classList.add('Items');
  newItem.innerHTML = output;
  $app.appendChild(newItem);
}

const handleLocalStorage = info => {
  localStorage.setItem('next_fetch', info.next);
}

const getData = async api => {
  try {
    const response = await fetch(api);
    const data = await response.json();
    const characters = data.results;
    const info = data.info;
    handleHtmlTemplate(characters);
    handleLocalStorage(info);
  } catch (error) {
    console.log(error)
  }
}

const loadData = () => {
  const localURL = localStorage.getItem('next_fetch');
  let fetchURL;
  if (localURL) {
    fetchURL = localURL
  } else {
    fetchURL = API;
  }
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