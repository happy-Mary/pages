var mainContainer = document.getElementsByClassName("mainContainer")[0];
var blocksContainer = document.getElementsByClassName("blocksContainer")[0];
var blocks = blocksContainer.children;

var menu = document.getElementsByClassName("menu")[0];
var menuItems = menu.getElementsByTagName("input");

function moveBlocks() {
    for (var i = 0; i < menuItems.length; i++) {
        if (menuItems[i].checked === true) {
            var leftPos = blocks[i].offsetLeft;
            var topPos = blocks[i].offsetTop;
            // смена хеша url
            var hashName = hashes[i];
            SwitchToState(hashName);

            blocksContainer.style.left = -leftPos + "px";
            blocksContainer.style.top = -topPos + "px";
        }
    }
}

menu.addEventListener("click", moveBlocks, false);

window.onresize = function Size() {
    for (var i = 0; i < blocks.length; i++) {
        blocks[i].style.width = 100 + "vw";
        blocks[i].style.height = 100 + "vh";
        mainContainer.style.width = 100 + "vw";
        mainContainer.style.height = 100 + "vh";

    }
}