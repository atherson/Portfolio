document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname.split("/").pop(); // Get current page file name
    let navLinks = document.querySelectorAll(".nav-item");

    navLinks.forEach(link => {
        let linkHref = link.getAttribute("href");
        if (linkHref.includes(currentPage) && currentPage !== "") {
            link.classList.add("active"); // Add active class to matching link
        }
    });
});
