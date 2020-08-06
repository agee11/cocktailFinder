function findRecipes(ingredient){
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
			let list = document.createElement("div");
			list.setAttribute("id", "drinkList");
			list.setAttribute("class", "page-container")
			data.drinks.forEach(drink => {
				let item = document.createElement("div");
				item.setAttribute("class", "drink-item")
				let image = document.createElement("img");
				image.setAttribute("src", drink.strDrinkThumb);
				image.setAttribute("class", "preview-img");
				image.setAttribute("onclick", "openDrinkInfo("+drink.idDrink+")");
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

function init(){
  let query = decodeURIComponent(window.location.search);
  const id = query.substring(1).split("=")[1];
  findRecipes(id);
}

window.onload = init();
