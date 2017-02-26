console.log("---- Multiple recipes ----")

var recipe = {
    "name": "",
    "description": "",
    "category": "",
    "ingredients": [],
    "steps": [],
}

$(document).ready(function() {
	var recipesList;
	var response = $.ajax({
		url: "http://localhost:8080/recipe",
		method: "GET",
		xhrFields: {
			withCredentials: true
		},
		dataType: "json",
		success: function(data) {
			//alert(JSON.stringify(data))
			recipesList = data;
			console.log(JSON.stringify(recipesList))
			for(var i = 0; i < data.length; i++) {
				curName = data[i].name;
				console.log(curName)
				$("#all-recipes").append(
					'<li>'+curName+'</li>'
				);
			}
		}
	})
});
