
var elements = document.getElementsByClassName('protected');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    element.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    element.addEventListener('dragstart', function (e) {
        e.preventDefault();
    });
    element.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === "c") {
            e.preventDefault();
        }
    });
}
