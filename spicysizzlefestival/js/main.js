// Declare burger menu variables
let hamburger = document.querySelector('header .fas.fa-bars');
let nav = document.querySelector('header nav');

// Add event listener
hamburger.addEventListener('click', toggleNav);

// Burger menu functions
function toggleNav() {
    nav.classList.toggle('open');
    hamburger.classList.toggle('fa-times')
}


// Declare slider variables
let prevControl = document.querySelector('.slider .control.prev');
let nextControl = document.querySelector('.slider .control.next');
let images = document.querySelector('.slider .images');
let imageCollection = document.querySelectorAll('.slider img');
let numImages = imageCollection.length;
let lastIndex = numImages - 1;
let imageIndex = 0;

// Initialise width
images.style.width = numImages*100+"%";
images.style.gridTemplateColumns = "repeat("+numImages+", 1fr)"

// Add event listeners
prevControl.addEventListener('click', slideToPrevImage);
nextControl.addEventListener('click', slideToNextImage);

// Slider functions
function slideToPrevImage() {
    if(imageIndex > 0) {
        imageIndex --;
    } else {
        imageIndex=lastIndex;
    }
    slideImages()
}

function slideToNextImage() {
    if(imageIndex < lastIndex) {
        imageIndex ++;
    } else {
        imageIndex = 0;
    }
    slideImages()
}

function slideImages() {
    images.style.marginLeft = -imageIndex*100+"%";
}