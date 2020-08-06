var i = 0;
function findRecipes(event){
	console.log("what");
	let ingredient = document.forms["ingredientInput1"]["ingredient1"].value;

	window.location.href = "search.html" + "?ingredient=" +ingredient;
	return false;
}

function addInput(){
	let input = document.createElement("input");
	let container = document.createElement("div");
	let remove = document.createElement("button");
	let appender = document.createElement("div");
	container.className = "input-group home-ingredient-input";
	input.type = "text";
	input.name = "ingredient";
	input.className = "form-control";
	input.placeholder = "Ingredient";
	remove.className = "btn btn-danger";
	remove.type = "button";
	remove.innerHTML = "X";
	container.id = "ingredient"+i;
	remove.onclick = () => {removeIngredient(container.id)};
	appender.className = "input-group-append";
	appender.append(remove);
	container.append(input);
	container.append(appender);
	$("#additional-ingredient").append(container);
	i++;
}

function removeIngredient(name){
	console.log(name);
	let element = document.getElementById(name);
	element.parentNode.removeChild(element);
}
