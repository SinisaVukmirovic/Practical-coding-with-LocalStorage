const APP = {
    keybase: 'TV-Shows-App-',
    keys: [],
    
    init() {
        // start the APP
        document.getElementById('btnSave').addEventListener('click', APP.saveCharacter) ;
        document.querySelector('header').addEventListener('click', APP.loadCharacter);

        APP.loadShows();
    },
    saveCharacter(e) {
        e.preventDefault();

        let showInput = document.getElementById('show').value.trim();
        let characterInput = document.getElementById('char').value.trim();

        // checking if both, show and char are provided
        if (showInput && characterInput) {
            // first looking in local storage to see if there already is a key
            let key = APP.keybase + showInput.toLowerCase();
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

            APP.loadShows();
        }
    },

    loadShows() {
        // go to local storage and retrieve all the keys that start with APP.keybase
        let numb = localStorage.length;
        
        if (numb) {
            // as long as the number in loc storage in not zero, reset the keys arr
            APP.keys = [];

            for (let i = 0; i < numb; i++) {
                let key = localStorage.key(i);

                if (key.startsWith(APP.keybase)) {
                    APP.keys.push(key);
                }
            }
        }

        APP.buildNav();
    },

    buildNav() {
        let nav = document.querySelector('header');
        nav.innerHTML = '';

        let foot = document.querySelector('footer');
        foot.innerHTML = '';

        let docFragment = document.createDocumentFragment();

        APP.keys.forEach(key => {
            // create a new anchor in the header for each TV Show
            let a = document.createElement('a');
            a.className = 'show';
            a.textContent = key.replace(APP.keybase, '');

            docFragment.append(a);
        });

        nav.append(docFragment);
    },

    loadCharacter(e) {
        if (e.target.tagName === 'A') {
            // put the show character into the input
            let TVshow = e.target.textContent.toLowerCase();
            document.getElementById('show').value = TVshow;

            // remove old and add new active class
            let oldActive = document.querySelector('header a.active');
            if (oldActive) {
                oldActive.classList.remove('active');
            }
            e.target.classList.add('active');

            // get the chars of the selected show and build footer
            let key = APP.keybase + TVshow;
            let storage = localStorage.getItem(key);

            if (storage) {
                let characters = JSON.parse(storage);
                APP.buildCharacters(characters);
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', APP.init);