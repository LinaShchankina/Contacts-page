import { changeContactsList } from "./contactsList.js";

/* change page selector view */
export function changeSelectorState(currentPageIndex, prevPageIndex, pagesCount, currentButtonIndex = null)
{
    const pagesNumbers = document.querySelectorAll(".pages__number");
    const pagesButtons = document.querySelectorAll(".pages__button");

    setButtonActive(pagesNumbers[currentPageIndex]);
    setButtonDisactive(pagesNumbers[prevPageIndex]);

    const prevPageNumber = +pagesNumbers[prevPageIndex].textContent;

    /* Back */
    if (currentButtonIndex === 0) {
        /* go to previous set of buttons */
        if (currentPageIndex === 2) {
            for (let i = 0; i < pagesNumbers.length; i++)
                pagesNumbers[i].textContent = (prevPageNumber  - pagesNumbers.length + i).toString();
            /* button Next becomes active */
            pagesButtons[1].style.pointerEvents = 'auto';
        }
        else {
            /* if it's first page, button Back becomes disactive */
            if (prevPageNumber === 2)
                pagesButtons[currentButtonIndex].style.pointerEvents = 'none';
            /* button Next becomes active */
            pagesButtons[1].style.pointerEvents = 'auto';
        }
    }
    /* Next */
    else if (currentButtonIndex === 1) {
        /* go to next set of buttons */
        if (currentPageIndex === 0) {
            for (let i = 0; i < pagesNumbers.length; i++) {
                if (prevPageNumber + 1 + i > pagesCount)
                    pagesNumbers[i].textContent = '';
                else
                    pagesNumbers[i].textContent = (prevPageNumber + 1 + i).toString();
            }
            if (+pagesNumbers[currentPageIndex].textContent === pagesCount)
                pagesButtons[currentButtonIndex].style.pointerEvents = 'none';
            pagesButtons[0].style.pointerEvents = 'auto';
        }
        else {
            if (+pagesNumbers[currentPageIndex].textContent === pagesCount)
                pagesButtons[currentButtonIndex].style.pointerEvents = 'none';
            else
                pagesButtons[currentButtonIndex].style.pointerEvents = 'auto';
            pagesButtons[0].style.pointerEvents = 'auto';
        }
    }
    else {
        if (+pagesNumbers[currentPageIndex].textContent === 1) {
            pagesButtons[0].style.pointerEvents = 'none';
            pagesButtons[1].style.pointerEvents = 'auto';
        }
        else {
            pagesButtons[0].style.pointerEvents = 'auto';

            if (+pagesNumbers[currentPageIndex].textContent === pagesCount) 
                pagesButtons[1].style.pointerEvents = 'none';
            else 
                pagesButtons[1].style.pointerEvents = 'auto';
        }
    }
}

function setButtonActive(HTMLelement) {
    HTMLelement.style.color = 'white';
    HTMLelement.style.backgroundColor = ' #2CBFBB';
    HTMLelement.style.pointerEvents = 'none';
}

function setButtonDisactive(HTMLelement) {
    HTMLelement.style.color = 'black';
    HTMLelement.style.backgroundColor = 'white';
    HTMLelement.style.pointerEvents = 'auto';
}

/* init new page selector */
export function initPagesSelector(pageInfo) {

        const currentPagesCount = pageInfo.pagesCount === 2 ? pageInfo.pagesCount : 3;

        const pagesSelector = document.querySelector(".pages__row");
        pagesSelector.textContent = '';

        pagesSelector.insertAdjacentHTML('beforeEnd', `<div class="pages__button">Back</div>`);
        for (let i = 0; i < currentPagesCount; i++) {
            const template = `<div class="pages__number">${i + 1}</div>`;
            pagesSelector.insertAdjacentHTML('beforeEnd', template);
        }
        pagesSelector.insertAdjacentHTML('beforeEnd', `<div class="pages__button">Next</div>`);
        
        const pagesNumbers = document.querySelectorAll(".pages__number");
        setButtonActive(pagesNumbers[0]);

        const pagesButtons = document.querySelectorAll(".pages__button");
        pagesButtons[0].style.pointerEvents = 'none';

        pageInfo.currentPageIndex = 0;
        pagesNumbers.forEach((pageNumber, pageIndex) => 
            pageNumber.addEventListener('click', changeNumberPage.bind(pageNumber, pageIndex, pageInfo))
        );
        pagesButtons.forEach((pageButton, buttonIndex) => 
            pageButton.addEventListener('click', changeButtonPage.bind(pageButton, buttonIndex, pageInfo))
        );
}

/* handle clicks on page number buttons */
export function changeNumberPage(pageIndex, pageInfo) {
    
    const pagesNumbers = document.querySelectorAll(".pages__number");

    changeContactsList(pageInfo, +this.textContent);
    
    changeSelectorState(pageIndex, pageInfo.currentPageIndex, pageInfo.pagesCount);

    pageInfo.currentPageIndex = pageIndex;
}

/* handle clicks on next and back buttons */
export function changeButtonPage(currentButtonIndex, pageInfo) {
    
    const prevPageIndex = pageInfo.currentPageIndex;

    currentButtonIndex === 0 ?  pageInfo.currentPageIndex-- :  pageInfo.currentPageIndex++;

    if (pageInfo.currentPageIndex < 0)
        pageInfo.currentPageIndex = 2;
    else if (pageInfo.currentPageIndex > 2)
        pageInfo.currentPageIndex = 0;

    changeSelectorState(pageInfo.currentPageIndex, prevPageIndex, pageInfo.pagesCount, currentButtonIndex);

    const currentPageNumber = +document.querySelectorAll(".pages__number")[pageInfo.currentPageIndex].textContent;
    changeContactsList(pageInfo, currentPageNumber);
}

/* hide page selectors for one page case */
export function checkCurrentPagesCount(pagesCount) {
    if (pagesCount > 1) {
        document.querySelector(".pages__row").style.visibility = "visible";
        document.querySelector(".contactsCounts__select").style.visibility = "visible";
        return true;
    }
    else {
        document.querySelector(".pages__row").style.visibility = "hidden";
        document.querySelector(".contactsCounts__select").style.visibility = "hidden";
        return false;
    }
}