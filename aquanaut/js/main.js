document.addEventListener('DOMContentLoaded', function() {

    /* Mobile navigation */
    const hamburger = document.querySelector('#burger-icon');
    const nav = document.querySelector('nav');
    const body = document.querySelector('body');
    const header = document.querySelector('header');

    hamburger.addEventListener('click', toggleNav);
    nav.addEventListener('click', toggleNav);

    function toggleNav(){
        nav.classList.toggle('open');
        header.classList.toggle("open");
        body.classList.toggle('no-scroll');
        hamburger.classList.toggle('times');
    }

    window.addEventListener('scroll', function(){
        header.classList.toggle("sticky", window.scrollY > 0);
    })

})