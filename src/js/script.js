function ibg(){
    let elements = document.querySelectorAll('.ibg');
    elements?.forEach(function(item){
        let image = item.querySelector('img');
        if( image.src.length > 0 ){
            item.style.backgroundImage = `url("${image.src}")`;
        }
    });
}

ibg();

//====================================================================================

const navMenu = document.querySelector('.content__menu');
const portfolioMenu = document.querySelector('.portfolio__menu');

navMenu.addEventListener('click', (event) => navMenuHandler(event));
portfolioMenu.addEventListener('click', (event) => portfolioMenuHandler(event));


function navMenuHandler(event) {
    if (event.target.nodeName != 'A') {
        return;
    }
    menuHandler(event.target, navMenu.querySelectorAll('.menu__item'))
}

function portfolioMenuHandler(event) {
    if (event.target.nodeName != 'LI') {
        return;
    }
    menuHandler(event.target, portfolioMenu.querySelectorAll('.menu__item'))
}

function menuHandler(targetElement, menuItems) {
    for (const element of menuItems) {
        element.classList.remove('menu__item_active');
    }
    targetElement.classList.add('menu__item_active');
}

//====================================================================================

let portfolioItems = document.querySelectorAll('.portfolio__item');
document.querySelector('.filter').addEventListener('click', (e) => filterHandler(e));


function filterHandler(e) {
    if (e.target.nodeName != 'LI') {
        return;
    }
    let itemClass = `f_${e.target.dataset.filter}`;
    if (e.target.dataset.filter == 'all') {
        portfolioItems.forEach(item => showItem(item))
    }
    else {
        portfolioItems.forEach(item => {
            if(item.classList.contains(itemClass)) {
                showItem(item);
            }
            else {
                hideItem(item);
            }
        })
    }
}

function showItem(item) {
    item.style.display = 'block';
}

function hideItem(item) {
    item.style.display = 'none';
}

//====================================================================================

let contactForm = document.querySelector('.contact__form');

contactForm.addEventListener('submit', (event) => contactFormSubmitHandler(event));

function contactFormSubmitHandler(event) {
    event.preventDefault();
    contactForm.reset();
}