// changing border for selected sibling checkboxes
var rooms = document.querySelectorAll('.roomsItems input');
var labels = document.querySelectorAll('.roomsItems label');

for(var i=0; i<rooms.length; i++) {
	var item = rooms[i];
	item.onclick = changeBorder;
}

function changeBorder(){
	for(var i = 0; i<rooms.length-1; i++) {
		if(rooms[i].checked === true && rooms[i+1].checked === true) {
			labels[i].style.borderRightColor="#c8c7c7";
		} else {labels[i].style.borderRightColor="#418ccf";}
	}
}

// pattern for input text with numbers
var numFieldPattern = /^[0-9]+$/;
var numPattern = /[0-9]/;

var costFieds = document.querySelectorAll(".numField");
for(var i=0; i<costFieds.length; i++) {
	costFieds[i].onpaste = function(e) {
		var newValue = e.originalEvent.clipboardData.getData('Text');

		  if (!numFieldPattern.test(newValue)) {
		    e.stopPropagation();
		    return false;
		  }
		}

	costFieds[i].onkeypress = function(e){
	  return numPattern.test(e.key);
	}
}
