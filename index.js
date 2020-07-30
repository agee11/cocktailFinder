
function findRecipes(event){
	let ingredient = document.forms["ingredientInput1"]["ingredient1"].value;
	if(document.getElementById("drinkList") !== null){
		let element = document.getElementById("drinkList");
		element.parentNode.removeChild(element);
	}
	fetch("https://the-cocktail-db.p.rapidapi.com/filter.php?i="+ingredient, {
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
			let list = document.createElement("ul");
			list.setAttribute("id", "drinkList");
			data.drinks.forEach(drink => {
				let item = document.createElement("li");
				let image = document.createElement("img");
				image.setAttribute("src", drink.strDrinkThumb);
				image.setAttribute("class", "preview-img");
				image.setAttribute("onclick", "openDrinkInfo("+drink.idDrink+")");
				//image.setAttribute("onclick", "getRecipe("+drink.idDrink+")");
				image.setAttribute("id", drink.idDrink);
				item.appendChild(image);
				item.innerHTML += drink.strDrink;
				list.appendChild(item);
			})
			document.body.appendChild(list);
		})
	})
	.catch(err => {
		console.log(err);
	});
	return false;
}

function openDrinkInfo(id){
	window.location.href = "drinkInfo.html" + "?drinkId=" +id;
}
