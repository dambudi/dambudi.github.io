document.addEventListener('DOMContentLoaded', function () {
  
    /* Mobile navigation */
    const hamburger = document.querySelector('#burger-icon');
    const nav = document.querySelector('nav');
    const mobileNav = document.querySelector('.nav-links');
    const body = document.querySelector('body');

    hamburger.addEventListener('click', toggleNav);
    mobileNav.addEventListener('click', toggleNav);
    if (hamburger.classList.contains('times')) {
        mobileNav.addEventListener('click', toggleNav);
    }

    function toggleNav(){
        nav.classList.toggle('open');
        mobileNav.classList.toggle('open');
        hamburger.classList.toggle('times');
        body.classList.toggle('no-scroll');
    }
    
})