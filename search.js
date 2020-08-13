function findRecipes(ingredient){
	ingredient.forEach(item => {
		fetch("https://the-cocktail-db.p.rapidapi.com/filter.php?i="+item, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
				"x-rapidapi-key": "2d05695c28mshf1d5b898c97b994p16ad16jsnf88b07a75603"
			}
		})
		.then(response => {
			response.body.getReader().read().then(res => {
				const list = document.getElementById("drinkList");
				let ingredientName = document.createElement("h1");
				ingredientName.setAttribute("class", "ingredient-title");
				ingredientName.setAttribute("id", item);
				ingredientName.innerHTML = item;
				list.appendChild(ingredientName);
				list.appendChild( document.createElement("hr"));

				const navbar = document.getElementById("nav-list");
				let navItem = document.createElement("li");
				navItem.setAttribute("class", "nav-item")
				let navLink = document.createElement("a");
				navLink.setAttribute("class", "nav-link")
				navLink.setAttribute("href", "#"+item);
				navLink.innerHTML = item;
				navItem.appendChild(navLink);
				navbar.appendChild(navItem);

				if(res.value){
					const data = JSON.parse(String.fromCharCode.apply(null, res.value));
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
				}else{
					let container = document.createElement("div");
					container.setAttribute("id", "error-message");
					container.setAttribute("class", "error");
					container.innerHTML = "<i class='fas fa-exclamation-triangle fa-5x'></i><h1>Nothing Found</h1>";
					list.appendChild(container);
				}
			})
		})
		.catch(err => {
			console.log(err);

		});
	});


	return false;

}

function openDrinkInfo(id){
	window.location.href = "drinkInfo.html" + "?drinkId=" +id;
}

function init(){
  let query = decodeURIComponent(window.location.search);
  let id = query.substring(1).split(/[=,]/);
	id.shift();
	id = id.filter(x => x !== "")
  findRecipes(id);
}

window.onload = init;
