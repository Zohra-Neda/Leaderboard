import './styles/main.css';

const apiKey = 'TEQm7e33TDUqUa1vC62t';
const requestURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores`;

const form = document.querySelector('#form');
const name = document.querySelector('#name');
const score = document.querySelector('#score');
const refreshBtn = document.querySelector('#refresh');
const scoresList = document.querySelector('.scores');

const addNewScore = async (e) => {
  e.preventDefault();
  const gamerName = name.value;
  const gamerScore = score.value;
  await fetch(requestURL, {
    method: 'POST',
    body: JSON.stringify({ user: `${gamerName}`, score: `${gamerScore}` }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json());
  name.value = '';
  score.value = '';
};

form.addEventListener('submit', addNewScore);

const getScoresList = async () => {
  await fetch(requestURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      scoresList.innerHTML = '';
      data.result.forEach((input) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.innerHTML = `${input.user} : ${input.score}`;
        scoresList.appendChild(listItem);
      });
    });
};
refreshBtn.addEventListener('click', getScoresList);