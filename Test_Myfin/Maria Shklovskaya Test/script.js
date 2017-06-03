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

// pattern for input[text] with numbers
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

// open and close modal window
var closeIcon = document.querySelector(".closeModal");
var modalWindow =  document.querySelector(".modalArea");
var openButton = document.querySelector(".openModal");

closeIcon.addEventListener('click', closeModalWindow, false);
openButton.addEventListener('click', openModalWindow, false);

function closeModalWindow(e){
	e.preventDefault;
	modalWindow.style.display="none";
}

function openModalWindow(e){
	e.preventDefault;
	modalWindow.style.display="block";
}


// jQuery-UI Slider
$( function() {

	function setSlider(sliderId, input1, input2, min, max, value2) {
		 var sliderSettings = {
	      range: true,
	      animate: "slow",
	      min: min,
	      max: max,
	      values: [ min, value2 ],
	      slide: function( event, ui ) {
	        $(input1).val( ui.values[ 0 ]);
	        $(input2).val( ui.values[ 1 ]);
	      }
    	}

		$( sliderId ).slider(sliderSettings);

	    $( input1 ).val( $( sliderId ).slider( "values", 0 ));
	    $( input2 ).val( $( sliderId ).slider( "values", 1 ));

	    $( input1 ).keyup(function() {
			$( sliderId ).slider( "values", 0, $(this).val() );
		});

		$( input2 ).keyup(function() {
			$( sliderId ).slider( "values", 1, $(this).val() );
		});
	}

	setSlider("#slider-range-1", "#dist-num1", "#dist-num2", 0, 20, 8);
	setSlider("#slider-range-2", "#area-num1", "#area-num2", 30, 200, 80);
			
});