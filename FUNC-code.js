const main = document.querySelector('main');
const nav = document.querySelector('header');
const foot = document.querySelector('footer');
const keybase = 'TV-Shows-App-';
let keys = [];

const init = () => {
    const btnSave = main.querySelector('#btnSave');

    btnSave.addEventListener('click', saveCharacter);
    nav.addEventListener('click', loadCharacters);

    loadShows();
};

const loadShows = () => {
    let numb = localStorage.length;

    if (numb) {
        keys = [];

        for (let i = 0; i < numb; i++) {
            let key = localStorage.key(i);

            if (key.startsWith(keybase)) {
                keys.push(key);
            }
        }
    }

    buildNav();
};

// nav is considered both - top and bottom navigations with show and char names
const buildNav = () => {
    nav.innerHTML = '';
    foot.innerHTML = '';
    
    let docFragment = document.createDocumentFragment();
    // The DocumentFragment interface represents a minimal document object that has no parent. It is used as a lightweight version of Document that stores a segment of a document structure comprised of nodes just like a standard document. The key difference is due to the fact that the document fragment isn't part of the active document tree structure. Changes made to the fragment don't affect the document (even on reflow) or incur any performance impact when changes are made.

    keys.forEach(key => {
        let a = document.createElement('a');
        a.className = 'show';
        a.textContent = key.replace(keybase, '');

        docFragment.append(a);
    });

    nav.append(docFragment);
};

const saveCharacter = (e) => {
    e.preventDefault();

    let showInput = main.querySelector('#show').value.trim();
    let characterInput = main.querySelector('#char').value.trim();

    // checking if both, show and char are provided
    if (showInput && characterInput) {
        // first looking in local storage to see if there already is a key
        let key = keybase + showInput.toLowerCase();
        let storage = localStorage.getItem(key);
        let characters = [];

        if (storage) {
            characters = JSON.parse(storage);
        }
        characters.push(characterInput);
        // removing duplicated by converting to Set then back to an array            
        characters = Array.from(new Set(characters));
        // updating local storage with new array with added character
        localStorage.setItem(key, JSON.stringify(characters));

        showInput = main.querySelector('#show').value = '';
        characterInput = main.querySelector('#char').value = '';

        loadShows();
    }
};

const loadCharacters = (e) => {
    if (e.target.tagName === 'A') {
        // put the show character into the input
        let TVshow = e.target.textContent.toLowerCase();
        main.querySelector('#show').value = TVshow;

        // remove old and add new active class
        let oldActive = nav.querySelector('a.active');
        if (oldActive) {
            oldActive.classList.remove('active');
        }
        e.target.classList.add('active');

        // get the chars of the selected show and build footer
        let key = keybase + TVshow;
        let storage = localStorage.getItem(key);

        if (storage) {
            let characters = JSON.parse(storage);

            buildCharacters(characters);
        }
    }
};

const buildCharacters = (characters) => {
    foot.innerHTML = '';

    let docFragment = document.createDocumentFragment();

    characters.forEach(char => {
        let span = document.createElement('span');
        span.className = 'char';
        span.textContent = char;

        docFragment.append(span);
    });

    foot.append(docFragment);
};

document.addEventListener('DOMContentLoaded', init);