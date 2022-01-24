document.addEventListener('DOMContentLoaded', function() {
    
    // SETTINGS
    // Enable Spoiler Filter
    let spoilerFilter = document.querySelector('#spoiler-filter');
    let filteredApps = document.querySelectorAll('.filtered-apps');

    spoilerFilter.onclick = function() {filterOff()};
    console.log(filteredApps);

    function filterOff() {
        for (let filteredApp of filteredApps) {
        filteredApp.classList.toggle('hide');
        }
    }

})