import { setLocalStorage } from "./storage.js";

/* change contact info */
export function changeData(contactIndex, propertyIndex, pageInfo, event) {
    
    if (!event.target.validity.valid) return;

    const pagesNumbers = document.querySelectorAll(".pages__number");
    const contactNames = document.querySelectorAll(".mainPart__name");
    const contactPhones = document.querySelectorAll(".phone__value");

    const currentPageNumber = +pagesNumbers[pageInfo.currentPageIndex].textContent;
    const contactNumber =  (currentPageNumber - 1) * pageInfo.currentContactsCount + contactIndex;
    const currentContact = pageInfo.currentContactsArray[contactNumber];
    const newPropertyValue = event.target.value;

    switch(propertyIndex) {
        /* name */
        case 0: { 
            currentContact.name = newPropertyValue;
            contactNames[contactIndex].textContent = currentContact.name;
            break;
        }
        /* username */
        case 1: {
            currentContact.username = newPropertyValue;
            break;
        } 
        /* phone */
        case 2: {
            currentContact.phone = newPropertyValue;
            contactPhones[contactIndex].textContent = newPropertyValue;
            break;
        }
        /* email */
        case 3: {
            currentContact.email = newPropertyValue;
            break;
        }
    }
    pageInfo.currentContactsArray[contactNumber] = currentContact;
    setLocalStorage('contacts', pageInfo.currentContactsArray);
}

/* open window with additional info */
export function openAdditionalInfo(num) {
    this.classList.toggle("active");
    /* open and close window changing it's height */
    const addPart = document.querySelectorAll(".contact_addPart");
    if (addPart[num].style.maxHeight){
       addPart[num].style.maxHeight = null;
     } else {
        addPart[num].style.maxHeight = addPart[num].scrollHeight + "px";
     }
}