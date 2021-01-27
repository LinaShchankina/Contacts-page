'use strict';

import { getData } from "./getData.js";
import { initContactsList } from "./contactsList.js";
import { setLocalStorage, getLocalStorage } from "./storage.js";
import { checkCurrentPagesCount, initPagesSelector } from "./pageSelector.js";
import { initPageContactsCountSelector } from "./countSelector.js";
import { initSearchComponents } from "./searchContact.js"

async function main() {

    /* get necessary data from database */
    const allContacts = getLocalStorage('contacts');
    if (!allContacts) {
        allContacts = await getData().then(data => data.map(item => ({name: item.name, username: item.username, phone: item.phone, email: item.email}))
        .sort((a, b) => a.name < b.name ? -1 : 1));
        setLocalStorage('contacts', allContacts);
    } 

    /* necessary data */
    const pageInfo = {
        currentPageIndex: 0,
        pagesCount: undefined,
        currentContactsCount: undefined,
        sorted: false,
        currentContactsArray: allContacts
    }

    pageInfo.currentContactsCount = initPageContactsCountSelector(pageInfo);
    
    pageInfo.pagesCount = Math.ceil(pageInfo.currentContactsArray.length / pageInfo.currentContactsCount);
    if (checkCurrentPagesCount(pageInfo.pagesCount))
        initPagesSelector(pageInfo);

    initContactsList(pageInfo);

    initSearchComponents(allContacts, pageInfo);
}


main();