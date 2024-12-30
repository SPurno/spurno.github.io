document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const navbarContainer = document.querySelector('.navbar-container');

    const handleScroll = () => {
        const section3Top = document.getElementById('section3').offsetTop;
        if (window.scrollY >= section3Top) {
            navbarContainer.classList.add('fixed');
        } else {
            navbarContainer.classList.remove('fixed');
        }
    };

    window.addEventListener('scroll', handleScroll);
});