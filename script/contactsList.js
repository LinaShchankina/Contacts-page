import { openAdditionalInfo, changeData } from './contact.js';

/* initialisation of contact list for current page */
export function initContactsList (pageInfo) {
    const contactsList = document.querySelector(".list__row");
    contactsList.textContent = '';
    
    pageInfo.currentContactsArray.filter((item, ind) => ind < pageInfo.currentContactsCount)
        .forEach(elem => contactsList.insertAdjacentHTML('beforeEnd', createNewContact(elem)));

    /* Get buttons, which open additional contact info */
    const infoButtons = document.querySelectorAll(".mainPart__btn");
    const inputData = document.querySelectorAll(".addPart__value");
    let contactsCount = pageInfo.currentContactsCount < pageInfo.currentContactsArray.length ? pageInfo.currentContactsCount : pageInfo.currentContactsArray.length;
    for (let i = 0; i < contactsCount; i++) {
        /* Binding a function to a click event for current infoButton */
        infoButtons[i].addEventListener('click', openAdditionalInfo.bind(infoButtons[i], i));
        for (let j = 0; j < inputData.length / infoButtons.length; j++)
            inputData[4 * i + j].addEventListener('change', changeData.bind(inputData[j], i, j, pageInfo));
    }
}

/* change contacts on current page */
export function changeContactsList(pageInfo, currentPageNumber) {
    const avatarLetter = document.querySelectorAll(".mainPart__avatar");
    const name = document.querySelectorAll(".mainPart__name");
    const phone = document.querySelectorAll(".phone__value");
    const addInfo = document.querySelectorAll(".addPart__value");
    const contacts = document.querySelectorAll(".list__contact");
    const addPart = document.querySelectorAll(".contact__addPart");
    
    for(let i = 0; i < pageInfo.currentContactsCount; i++) {
        const contactNumber = (currentPageNumber - 1) * pageInfo.currentContactsCount + i;
        if (contactNumber < pageInfo.currentContactsArray.length) {
            const contact = pageInfo.currentContactsArray[contactNumber];
            name[i].textContent = contact.name;
            phone[i].textContent = contact.phone;
            avatarLetter[i].textContent = contact.name[0];
            contacts[i].style.visibility = 'visible';
            if (addPart[i].style.maxHeight) addPart[i].style.maxHeight = null;
            addInfo[i * 4 + 0].value = contact.name;
            addInfo[i * 4 + 1].value = contact.username;
            addInfo[i * 4 + 2].value = contact.phone;
            addInfo[i * 4 + 3].value = contact.email;
        }
        else {
            name[i].textContent = '';
            phone[i].textContent = '';
            avatarLetter[i].textContent = '';
            contacts[i].style.visibility = 'hidden';
            addInfo[i * 4 + 0].value = '';
            addInfo[i * 4 + 1].value = '';
            addInfo[i * 4 + 2].value = '';
            addInfo[i * 4 + 3].value = '';
        }
    }
}

/* create contact layout */
export function createNewContact(object) {

    let template = `
        <div class="list__contact">
            <div class="contact__row">
                <div class="contact__mainPart">
                    <div class="mainPart__row">
                        <div class="mainPart__avatar">${object.name[0]}</div>
                        <div class="mainPart__body">
                            <div class="mainPart__name">${object.name}</div>
                            <div class="mainPart__phone">
                                <img class="phone__icon" src="./images/phone.png"/>
                                <div class="phone__value">${object.phone}</div>
                            </div>
                        </div>
                        <div class="mainPart__addButton">
                            <button class="mainPart__btn"></button>
                        </div>
                    </div>
                </div>
                <div class="contact__addPart">
                    <div class="addPart__row">
                        <div class="addPart__column">
                            <div class="addPart__property">name*:</div>
                            <input class="addPart__value" type="text" value="${object.name}">
                        </div>
                        <div class="addPart__column">
                            <div class="addPart__property">username:</div>
                            <input class="addPart__value" type="text" value="${object.username}">
                        </div>
                        <div class="addPart__column">
                            <div class="addPart__property">phone*:</div>
                            <input class="addPart__value check" type="tel" pattern="^[0-9+\(\)#\.\\s\/ext-]+$" value="${object.phone}">
                        </div>
                        <div class="addPart__column">
                            <div class="addPart__property">email:</div>
                            <input class="addPart__value check" type="email" value="${object.email}">
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    `;
    
    return template;
}