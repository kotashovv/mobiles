
window.onload = function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.cssText = "display: none";
//Показ мобильного меню
const menuButton = document.querySelector('.menu__burger');
const mobileMenu = document.querySelector('.header__mobile-menu');
const modal = document.querySelector('.modal');
const body = document.querySelector('body');

function showMenu() {
    mobileMenu.classList.toggle('is-active');
    modal.classList.toggle('is-active');
    menuButton.classList.toggle('is-active');
    body.classList.toggle('_lock')
}


menuButton.addEventListener('click', function(){
    showMenu();
})

modal.addEventListener('click', function() {
    showMenu();
})

//Плавный скролл до блока
const menuLinks = document.querySelectorAll('.link[data-goto]');
const headerHeight = document.querySelector('.header').offsetHeight;
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLinks => {
        menuLinks.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - headerHeight;

            if(menuButton.classList.contains('is-active')) {
                mobileMenu.classList.remove('is-active');
                modal.classList.remove('is-active');
                menuButton.classList.remove('is-active');
                body.classList.remove('_lock'); 
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: 'smooth'
            });
            e.preventDefault();
        }
    }
}


//Отзывчивая шапка при скролле

const headerBody = document.querySelector('.header__body');
document.addEventListener('scroll', function(){
    if(window.pageYOffset > 75) {
        headerBody.classList.add('scroll');
    } else {
        headerBody.classList.remove('scroll');
    }
})


// Анимации появления блоков


const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop, left: rect.left + scrollLeft
        }
    }
}

setTimeout(() => {
    animOnScroll();
}, 500);


};
    