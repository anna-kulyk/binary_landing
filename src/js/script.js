//==================================================================================== 

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

let mainblock = document.querySelector('.mainblock');

let navMenu = document.querySelector('.content__menu');
let portfolioMenu = document.querySelector('.portfolio__menu');

let navMenuItems = Array.from(navMenu.querySelectorAll('.menu__item'));

let about = document.querySelector("#about");
let portfolio = document.querySelector("#portfolio");
let contact = document.querySelector("#contact");

const mediaQuerySm = window.matchMedia('(max-width: 370px)');

//====================================================================================

window.addEventListener("load", calculateMainblockHeight);

window.addEventListener("resize", calculateMainblockHeight);

function calculateMainblockHeight() {
    mainblock.style.height = `${window.innerHeight}px`;
    if (mainblock.clientHeight < mainblock.scrollHeight) {
        mainblock.style.height = 'fit-content';
    }
}

//====================================================================================

navMenu.addEventListener('click', (event) => navMenuHandler(event));
portfolioMenu.addEventListener('click', (event) => portfolioMenuHandler(event));


function navMenuHandler(event) {
    if (event.target.nodeName == 'A' && !mediaQuerySm.matches) {
        menuHandler(event.target, navMenuItems);
    }
}

function portfolioMenuHandler(event) {
    if (event.target.nodeName == 'LI') {
        menuHandler(event.target, portfolioMenu.querySelectorAll('.menu__item'));
    }
}

function menuHandler(targetElement, menuItems) {
    if (targetElement.classList.contains('menu__item_active')) return;

    for (const element of menuItems) {
        element.classList.remove('menu__item_active');
    }
    targetElement.classList.add('menu__item_active');
}

//====================================================================================

let sectionObserver = new IntersectionObserver(function(entries) {

    entries.forEach(entry => {
        if(entry.isIntersecting  && !mediaQuerySm.matches) {
            let element = navMenuItems.filter(el => el.hash == `#${entry.target.id}`)[0];
            menuHandler(element, navMenuItems);
        }
    });
}, { rootMargin: `-50% 0px -40%`, threshold: [0] });

sectionObserver.observe(about);
sectionObserver.observe(portfolio);
sectionObserver.observe(contact);

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

let stickyObserver = new IntersectionObserver(function(entries) {

    entries.forEach(entry => {
        if(!entry.isIntersecting  && !mediaQuerySm.matches) {
            navMenu.classList.add("sticky");
        }
        else {
            navMenu.classList.remove("sticky");
        }
    });
}, { threshold: [0] });

stickyObserver.observe(mainblock);

//====================================================================================

let contactForm = document.querySelector('.contact__form');

contactForm.addEventListener('submit', (event) => contactFormSubmitHandler(event));

function contactFormSubmitHandler(event) {
    event.preventDefault();
    contactForm.reset();
}

//====================================================================================