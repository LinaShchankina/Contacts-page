import { checkCurrentPagesCount, initPagesSelector } from "./pageSelector.js";
import { initContactsList } from "./contactsList.js";

/* initialisation selector of choosing contacts count on one page */
export function initPageContactsCountSelector(pageInfo) {
     const countSelector = document.querySelector(".contactsCounts__select");
     countSelector.options[0] = new Option('5', 5);
     countSelector.options[0].selected = true;
     countSelector.options[1] = new Option('10', 10);
     countSelector.options[2] = new Option('20', 20);
     countSelector.addEventListener('change', changePageContactsCount.bind(this, pageInfo));

     return +countSelector.options[0].value;
}

/* change contacts count on one page */
export function changePageContactsCount(pageInfo, event) {
     pageInfo.currentContactsCount = event.target.value;

     initContactsList(pageInfo);
     pageInfo.pagesCount = Math.ceil(pageInfo.currentContactsArray.length / pageInfo.currentContactsCount);

     if(checkCurrentPagesCount(pageInfo.pagesCount))
          initPagesSelector(pageInfo);
 }
