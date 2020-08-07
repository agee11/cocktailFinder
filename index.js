

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

function findRandom(){
		fetch("https://the-cocktail-db.p.rapidapi.com/random.php", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
			"x-rapidapi-key": "2d05695c28mshf1d5b898c97b994p16ad16jsnf88b07a75603"
		}
	})
	.then(response => {
		response.body.getReader().read().then(res => {
			const data = JSON.parse(String.fromCharCode.apply(null, res.value));
			console.log(data);
			const drinkInfo = data.drinks[0];
			window.location.href = "drinkInfo.html"+"?drinkId="+drinkInfo.idDrink;
		})
	})
	.catch(err => {
		console.log(err);
	});
}

var test = ["Mango", "Apple", "Orange"];

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

$(".form-control.typeahead").typeahead({
	hint: true,
	highlight: true,
	minLength: 1
},{
	name: "ingredients",
	source: substringMatcher(test)
});
