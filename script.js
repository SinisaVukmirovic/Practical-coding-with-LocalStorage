const APP = {
    keybase: 'TV-Shows-App-',
    keys: [],
    
    init() {
        // start the APP
        document.getElementById('btnSave').addEventListener('click', APP.saveCharacter) ;
        document.querySelector('header').addEventListener('click', APP.loadCharacter);
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
        }
    }
};

document.addEventListener('DOMContentLoaded', APP.init);