import { initContactsList } from "./contactsList.js";
import { checkCurrentPagesCount, initPagesSelector } from "./pageSelector.js";

export function initSearchComponents(allContacts, pageInfo) {
    const searchBar = document.querySelector(".search__value");
    const searchButton = document.querySelector(".search__btn");
    searchBar.addEventListener('keyup', searchContact.bind(this, allContacts, pageInfo));
    searchButton.addEventListener('click', clickSearchButton.bind(searchButton, searchBar));
}

export function searchContact(allContacts, pageInfo, event) {

    if (event.keyCode !== 13)  return;

    if (event.target.value === '') {
        pageInfo.sorted = false;
        pageInfo.currentContactsArray = allContacts;
        initContactsList(pageInfo);
        pageInfo.pagesCount = Math.ceil(allContacts.length / pageInfo.currentContactsCount);
    }
    else {
        pageInfo.sorted = true;
        pageInfo.currentContactsArray = allContacts.filter(item => item.name.toLowerCase().includes(event.target.value.toString().toLowerCase()));

        initContactsList(pageInfo);
    
        pageInfo.pagesCount = Math.ceil(pageInfo.currentContactsArray.length / pageInfo.currentContactsCount);
    }
    if (checkCurrentPagesCount(pageInfo.pagesCount))
        initPagesSelector(pageInfo);
};

export function clickSearchButton(searchBar) {
    const event = new KeyboardEvent('keyup', {"keyCode": 13});
    searchBar.dispatchEvent(event);
}