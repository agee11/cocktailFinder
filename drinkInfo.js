

function getRecipe(id){
	console.log(id);
	fetch("https://the-cocktail-db.p.rapidapi.com/lookup.php?i="+id, {
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
    $("#drink-display").attr("src", drinkInfo.strDrinkThumb);
    $("#drink-name").append(drinkInfo.strDrink);
    $("#alc-content").append(drinkInfo.strAlcoholic);
    $("#glass-content").append(drinkInfo.strGlass);

    for(let i = 1; i <=15; i++){
      if(drinkInfo["strIngredient"+i] !== null){
        let measurement = drinkInfo["strMeasure"+i] || 1;
        $("#ingredient-list").append("<li>"+measurement+" "+drinkInfo["strIngredient"+i]+"</li>");
      }
    }
    let instructions = drinkInfo.strInstructions;
    instructions = instructions.split(/(?<=\.)/);
    instructions.forEach(line => {
      $("#instructions-list").append("<li>"+line+"</li>");
    });
	})

})
.catch(err => {
	console.log(err);
});
}

function test(){
  let query = decodeURIComponent(window.location.search);
  const id = query.substring(1).split("=")[1];
  getRecipe(id);
}

window.onload = test();
