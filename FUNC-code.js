const main = document.querySelector('main');
const nav = document.querySelector('header');
const foot = document.querySelector('main');
const keybase = 'TV-Shows-App-';
let keys = [];

const init = () => {
    const btnSave = document.querySelector('#btnSave');

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

document.addEventListener('DOMContentLoaded', init);