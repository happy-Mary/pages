 // first slider
 $('.sl').slick( 
 	{dots: true});

// second slider
 $('.sl2').slick( 
 	{dots: false,
 	slidesToShow: 2
 	});

// dropdown menu event
 var M = document.getElementsByClassName("dropdown-menu")[0];

 M.onmouseleave = function(e) {
 	e.preventDefault();
	e = e || window.event;
 	M.style.display = "none";
 }

M.parentNode.onmouseover = function(e) {
 	e.preventDefault();
	e = e || window.event;
 	M.style.display = "block";
 }