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
			if(res.value){
				const data = JSON.parse(String.fromCharCode.apply(null, res.value));
				let list = document.createElement("div");
				list.setAttribute("id", "drinkList");
				list.setAttribute("class", "page-container")
				data.drinks.forEach(drink => {
					let item = document.createElement("div");
					item.setAttribute("class", "drink-item")
					item.setAttribute("onclick", "openDrinkInfo("+drink.idDrink+")");

					let image = document.createElement("img");
					image.setAttribute("src", drink.strDrinkThumb);
					image.setAttribute("class", "preview-img");
					image.setAttribute("id", drink.idDrink);
					item.appendChild(image);
					item.innerHTML += drink.strDrink;
					list.appendChild(item);
				})
				document.body.appendChild(list);
			}else{
				let container = document.getElementById("error-message");
				container.setAttribute("class", "error");
				container.innerHTML = "<i class='fas fa-exclamation-triangle fa-5x'></i><h1>Nothing Found</h1>";
			}
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
