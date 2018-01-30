// Select color input
let color = document.getElementById('colorPicker').value;
let tool = "pencil"

$('#colorPicker').on('change', function(){
	color = document.getElementById('colorPicker').value;
});

// Select size input
$('.sizePicker').on('submit', function(evt){
	evt.preventDefault();  // stops page reload

	//style
	$('table').css('outline-style','solid');

	

	//save values
	const height = $('#input_height').val();
	const width = $('#input_width').val();

	//call function
	makeGrid(width,height);

	//create once the button
	if ($('#clear').length == true){
		return;
	}
	
	$('#pixel_canvas')
		.last()
		.after('<br><button type="reset" id="clear">Clear Table</button>'); //creates the button
	

	//holdingClick the button
	$('#clear').on('click',function(){
		$('td').css('background-color','white');
	});
});


// Create table
const makeGrid = function(width, height){

	$("#pixel_canvas").html("");

	for (let i = 0; i < height; i++){
		let row = document.getElementById('pixel_canvas').insertRow(i);
		for (let j = 0; j < width; j++){
			let cell = row.insertCell(j);
		}
	}

	if ($('#checkbox').prop('checked') == false){
		$('td').css('border-color', 'transparent');
	}
};

//Erase a cell with double-click
$('#pixel_canvas').on('dblclick', 'td', function(evt){
	evt.target.style.background = 'white';
});

//Drag and paint
let holdingClick = false;

$('#pixel_canvas').on('mousedown', 'td', function(evt){
	evt.preventDefault();
	holdingClick = true;
	if(tool === "pencil")
		evt.target.style.background = color;
	else if(tool === "eraser")
		evt.target.style.background = "white";
});

$('#pixel_canvas').on('mouseover', 'td', function(evt){
	evt.preventDefault();
	if (!holdingClick)
		return

	 if(tool === "pencil")
	 	evt.target.style.background = color;
	 else if(tool === "eraser")
	 	evt.target.style.background = "white";
});

$('body').on('mouseup', function(){
	holdingClick = false;
});

//borders checkbox
$('#checkbox').on('change', function(){

	if(this.checked == true){
		$('td').css('border-color', 'black');
		return;
	}
	$('td').css('border-color', 'transparent');
});	


//pencil and eraser
$('#pencil').on('click', function(evt){
	if (!this.checked)
		return
	tool = "pencil"
	$('table').css('cursor', 'url("images/pencil.png") 0 32,auto');
});


$('#eraser').on('click', function(evt){

	if (!this.checked)
		return;
	
	tool = "eraser";
	$('table').css('cursor', 'url("images/eraser.png") 0 32,auto');
});

