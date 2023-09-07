
var elements = document.getElementsByClassName('protected');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    element.addEventListener('dragstart', function (e) {
        e.preventDefault();
    });
    element.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    element.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "c") {
            e.preventDefault();
        }
    });
}

// Function to check if more than 50% of an element is in the viewport
function isElementMoreThan50PercentInViewport(el) {
    var rect = el.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var elementHeight = rect.bottom - rect.top;

    return (
        (rect.top >= 0 && rect.top <= windowHeight * 0.5) ||
        (rect.bottom >= windowHeight * 0.5 && rect.bottom <= windowHeight) ||
        (rect.top < 0 && rect.bottom > windowHeight)
    );
}

// Specify the section names
const sectionNames = ['about', 'background', 'portfolio', 'contact'];

// Function to update the active navigation link
function updateActiveNavLink() {
    sectionNames.forEach(sectionName => {
        const navLink = document.querySelector(`a[href="#${sectionName}"]`);
        
        if (navLink && isElementMoreThan50PercentInViewport(document.getElementById(sectionName))) {
            // More than 50% of the section is in the viewport, add the "active" class to the nav link
            navLink.classList.add('active');
        } else if (navLink) {
            // Less than 50% of the section is in the viewport, remove the "active" class from the nav link
            navLink.classList.remove('active');
        }
    });
}

// Call the function initially and whenever the page is scrolled
updateActiveNavLink();
window.addEventListener('scroll', updateActiveNavLink);


// Add a click event listener to the "Copy Email" button
document.getElementById("copyButton").addEventListener("click", function () {
    // Get the email text from the <p> element
    var emailText = document.getElementById("public-email").innerText;

    // Create a temporary <textarea> element
    var tempTextarea = document.createElement("textarea");
    tempTextarea.value = emailText;
    document.body.appendChild(tempTextarea);

    // Select the text in the temporary <textarea>
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary <textarea> element
    document.body.removeChild(tempTextarea);

    // Change the text of the button to "Copied!"
    document.getElementById("copyButton").innerText = "Copied!";
});