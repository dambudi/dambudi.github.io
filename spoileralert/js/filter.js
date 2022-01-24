document.addEventListener('DOMContentLoaded', function() {
    
    // FILTER POPOUT
    // Open Filter Popout
    const filterItems = document.querySelectorAll('.filter-item');
    const filterPopout = document.querySelector('.filter-popout');
    const hideButton = document.querySelector('#hide-filter');
    const filterButton = document.querySelector('#btn-filter');
    let filterStatus = document.querySelector('#filter-status');


    for (let filterItem of filterItems) {
        filterItem.addEventListener('click', showFilter);
        
    }
    
    function showFilter() {
        if (filterPopout.classList.contains('show')){
        filterPopout.classList.remove('show');
        setTimeout(function(){
            filterPopout.classList.add('show');
        }, 350) 
        } else {
            filterPopout.classList.toggle('show');
            console.log(' filter show');
        }
    }


    // Close Filter Popout

    hideButton.addEventListener('click', hideFilter); 

    function hideFilter() {
        filterPopout.classList.toggle('show');
    }


    // Filter button
    const newGirl = document.querySelector('.new-girl')
    filterButton.addEventListener('click', toggleFilter);

    function toggleFilter(){
        filterButton.classList.toggle('grey');
        filterButton.classList.toggle('red');
        newGirl.classList.toggle('selected-item');
        if (filterStatus.innerHTML === "Filtering Spoilers") {
            filterStatus.innerHTML = "Not Filtering";
            
        } else {
            filterStatus.innerHTML = "Filtering Spoilers";
        }
    }

})