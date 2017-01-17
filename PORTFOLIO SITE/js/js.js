 var menuElem = document.getElementsByTagName('nav')[0];

    window.onscroll = function() {
      if (window.pageYOffset <= 0) {
         menuElem.style.backgroundColor= "transparent";
      } else if (window.pageYOffset > 0) {
        menuElem.style.backgroundColor= "rgba(255, 255, 255, 0.5)";
      }
    };