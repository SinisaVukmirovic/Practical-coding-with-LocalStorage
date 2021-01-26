const main = document.querySelector('main');
// const nav = document.querySelector('header');
const foot = document.querySelector('main');
const keybase = 'TV-Shows-App-';
let keys = [];

const init = () => {
    const btnSave = document.querySelector('#btnSave');
    const nav = document.querySelector('header');

    btnSave.addEventListener('click', saveCharacter);
    nav.addEventListener('click', loadCharacters);

};

document.addEventListener('DOMContentLoaded', init);