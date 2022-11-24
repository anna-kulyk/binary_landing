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

window.addEventListener("load", () => {
    let h = window.innerHeight;
    document.querySelector('.mainblock').style.height = `${h}px`;
});

// if (navigator.userAgent.indexOf("Mobi") > -1) {
//     window.addEventListener("resize", () => {
//         if (window.matchMedia("only screen and (orientation: landscape)").matches || window.innerHeight < 500) {
//             let h = window.outerHeight;
//             document.querySelector('.mainblock').style.height = `${h}px`;
//             sticky = window.pageYOffset + navMenu.getBoundingClientRect().top;
//         }
//     });
// }

window.addEventListener("resize", () => {
    let h = window.innerHeight;
    document.querySelector('.mainblock').style.height = `${h}px`;
});

//====================================================================================

navMenu.addEventListener('click', (event) => navMenuHandler(event));
portfolioMenu.addEventListener('click', (event) => portfolioMenuHandler(event));


function navMenuHandler(event) {
    if (event.target.nodeName != 'A' || mediaQuerySm.matches) {
        return;
    }
    menuHandler(event.target, navMenuItems)
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

let observer = new IntersectionObserver(function(entries) {

    entries.forEach(entry => {
        if(entry.isIntersecting  && window.innerWidth > 370) {
            let element = navMenuItems.filter(el => el.hash == `#${entry.target.id}`)[0];
            menuHandler(element, navMenuItems);
        }
    });
}, { threshold: [0.5] });

observer.observe(about);
observer.observe(portfolio);
observer.observe(contact);

//====================================================================================

// window.addEventListener("resize", setDefaultNavMenuColors);

// function setDefaultNavMenuColors() {
//     if (window.innerWidth > 370) return;
//     navMenuItems.forEach((item, index) => {
//         if (index == 0) {
//             item.classList.add('menu__item_active');
//         }
//         else {
//             item.classList.remove('menu__item_active');
//         }
//     })
// }

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

let observerSticky = new IntersectionObserver(function(entries) {

    entries.forEach(entry => {
        if(!entry.isIntersecting  && !mediaQuerySm.matches) {
            navMenu.classList.add("sticky");
        }
        else {
            navMenu.classList.remove("sticky");
        }
    });
}, { threshold: [0] });

observerSticky.observe(mainblock);

//====================================================================================

let contactForm = document.querySelector('.contact__form');

contactForm.addEventListener('submit', (event) => contactFormSubmitHandler(event));

function contactFormSubmitHandler(event) {
    event.preventDefault();
    contactForm.reset();
}

//====================================================================================