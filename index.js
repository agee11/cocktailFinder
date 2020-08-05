
function findRecipes(event){
	let ingredient = document.forms["ingredientInput1"]["ingredient1"].value;

	window.location.href = "search.html" + "?ingredient=" +ingredient;
}

function addInput(){
	let input = document.createElement("input");
	input.type = "text";
	input.name = "ingredient";
	input.className = "form-control";
	$("#additional-ingredient").append(input);
}
