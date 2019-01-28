(
    function main() {
        for (let i of ['outer', 'middle', 'inner']) {
            document.getElementById(i).addEventListener('click', function (e) {
                e.stopPropagation();
                alert(document.getElementById(i).getAttribute('name'));
            });
        }
    }
)();
