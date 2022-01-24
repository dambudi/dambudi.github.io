document.addEventListener('DOMContentLoaded', function() {

    // LINK POPOUT
    // Open Link Popout
    const linkItems = document.querySelectorAll('.link-item');
    const linkPopout = document.querySelector('.link-popout');
    const linkPopoutProfile = document.querySelector('.link-popout-profile');
    let linkStatus = document.querySelector('.link-status');
    let linkProfile = document.querySelector('.link-profile');

    for (let linkItem of linkItems) {
        linkItem.addEventListener('click', showLink);
    }

    function showLink() {
        if (linkPopoutProfile.classList.contains('show')){
            linkPopoutProfile.classList.toggle('show');
            linkPopout.classList.toggle('show');
            linkStatus.innerHTML = "Unlinked";
            linkProfile.innerHTML = "";
        } else if (linkPopout.classList.contains('show')){
            linkPopout.classList.remove('show');
            setTimeout(function(){
                linkPopout.classList.add('show');
            }, 350)
        } else {
            linkPopout.classList.toggle('show');
        console.log('link show')
        }
    }

    // Log in button
    const loginButton = document.querySelector('#btn-link');

    loginButton.addEventListener('click', openProfile)

    function openProfile() {
        linkPopout.classList.toggle('show');
        linkPopoutProfile.classList.toggle('show');
        linkStatus.innerHTML = "aliya@email.com";
    }

    // Selecting profile
    const profileAliya = document.querySelector('.profile-aliya')

    profileAliya.addEventListener('click', chooseProfile)

    function chooseProfile() {
        profileAliya.classList.toggle('selected')
        linkProfile.innerHTML = "Aliya's profile";
    }

    // Unlink button
    const unlinkButton = document.querySelector('#btn-unlink')

    unlinkButton.addEventListener('click', resetLink)

    // Close Link Popout
    const hideButton = document.querySelector('#hide-link');
    const hideButton2 = document.querySelector('#hide-link-2');

    hideButton.addEventListener('click', hideLink)
    hideButton2.addEventListener('click', hideLink)

    function resetLink() {
        profileAliya.classList.remove('selected')
        linkPopout.classList.remove('show')
        linkPopoutProfile.classList.remove('show')
        linkStatus.innerHTML = "Unlinked";
        linkProfile.innerHTML = "";
    }

    function hideLink() {
        linkPopout.classList.remove('show')
        linkPopoutProfile.classList.remove('show')
    }


})