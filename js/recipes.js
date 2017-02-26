/*
 * TODO: Do not allow blank fields
 * TODO: If required field is empty visually say so
 * TODO: Move up and move down items in instruction list
 * TODO: Do not allow new lines in instructions
 * TODO: Camel case everything
 * TODO: Send button w/ AJAX call
 */

console.log("---- Add Recipe -----")

var recipe = {
    "name": "",
    "description": "",
    "category": "",
    "ingredients": [],
    "steps": [],
}

$(document).ready(function() {

    // The test_button has been clicked
    $("#test_button").click(function() {
        debug_recipe();
    });

    // The text has changed in the recipe_name_input text
    $("#recipe_name_input").keyup(function() {
        recipe["name"] = $(this).val();
        debug_recipe();
    });

    // The text has changed in the recipe_description_input text area
    $("#recipe_description_input").keyup(function() {
        recipe["description"] = $(this).val();
        debug_recipe();
    });

    // A category has been typed or accepted
    $("input[name='categories']").focusout(function() {
        recipe["category"] = $(this).val();
        debug_recipe();
    });

    // Add Ingredient
    $("#add_ingredient_input").on('keyup', function (e) {
        // Fires when enter key is pressed
        if (e.keyCode == 13) {
            var ingredient = $(this).val();
            recipe['ingredients'].push(ingredient);
            generateHTMLListItems('ingredient-list', 'ingredient', 'ingredients');

            $(this).val("")
        }
    });

    // Delete Ingredient
    $("#ingredient-list").on('click', '.delete', function() {
        // Grab the hooked ingredient text from this list element
        var ingredient_value = $(this).siblings('.ingredient').text();

        // Find the element in the recipe list
        var found_index;
        for(var i = 0; i < recipe["ingredients"].length; i++) {
            if(recipe["ingredients"][i] == ingredient_value) {
                found_index = i;
                break;
            }
        }

        // Remove element from list
        recipe["ingredients"].splice(found_index, 1);
        generateHTMLListItems('ingredient-list', 'ingredient', 'ingredients');
    });



     // Edit Ingredient
    $("#ingredient-list").on('click', '.ingredient', function() {
        var oldIngredientValue = $(this).text();
        $(this).attr("contenteditable", "true");
        $(this).focus();
    });

    // Save ingredient that has been edited, and the rest of the ingredients
    $("#ingredient-list").on('focusout', '.ingredient', function() {
        updateRecipeList('ingredient-list', '.ingredient', 'ingredients')
    });

    // Add step
    $("#add-step-input").on('keyup', function (e) {
        // Fires when enter key is pressed
        if (e.keyCode == 13) {
            var step = $(this).val();
            recipe['steps'].push(step);
            generateHTMLListItems('step-list', 'step', 'steps');
            $(this).val("")
        }
    });

    // Delete step
    $("#step-list").on('click', '.delete', function() {
        // Grab the hooked step text from this list element
        var step_value = $(this).siblings('.step').text();

        // Find the element in the recipe list
        var found_index;
        for(var i = 0; i < recipe["steps"].length; i++) {
            if(recipe["steps"][i] == step_value) {
                found_index = i;
                break;
            }
        }

        // Remove element from list
        recipe["steps"].splice(found_index, 1);
        generateHTMLListItems('step-list', 'step', 'steps');
    });

    // Edit step
    $("#step-list").on('click', '.step', function() {
        var oldstepValue = $(this).text();
        $(this).attr("contenteditable", "true");
        $(this).focus();
    });

    // Save step that has been edited, and the rest of the steps
    $("#step-list").on('focusout', '.step', function() {
        updateRecipeList('step-list', '.step', 'steps')

    });

    // The test_button has been clicked
    $("#submit-recipe-btn").click(function() {
        debug_recipe();
        // TODO: Do validation here, final check that all fields are golden 
		submitRecipe()	
    });
	
	function submitRecipe() {
		makeCorsRequest("POST", "http://localhost:8080/recipe")
	};

    function generateHTMLListItems(listId, textId, field) {
        $("#"+listId).empty();
        for(var i = 0; i < recipe[field].length; i++) {
            currentValue = recipe[field][i];
            var deleteButton = '<button id=delete-'+textId+'-'+i+' class="delete">Delete</button>';
            //var upButton = '<button id=up-'+textId+'-'+i+' class="up">Up</button>';
            $("#"+listId).append(
                //'<li><span class="'+textId+'">'+ currentValue + '</span>'+deleteButton+upButton+'</li>'
                '<li><span class="'+textId+'">'+ currentValue + '</span>'+deleteButton+'</li>'
            );
        }
    }

    
    function updateRecipeList(listId, childClass, field) {
        var htmlListElements = $('#'+listId+' li');

        var newList = [];
        htmlListElements.each(function() {
            childText = $(this).children(childClass).text();
            newList.push(childText)
        });

        recipe[field] = newList;
    }

	// Create the XHR object.
	function createCORSRequest(method, url) {
	  var xhr = new XMLHttpRequest();
	  if ("withCredentials" in xhr) {
		// XHR for Chrome/Firefox/Opera/Safari.
		xhr.open(method, url, true);
	  } else if (typeof XDomainRequest != "undefined") {
		// XDomainRequest for IE.
		xhr = new XDomainRequest();
		xhr.open(method, url);
	  } else {
		// CORS not supported.
		xhr = null;
	  }
	  return xhr;
	}

	// Make the actual CORS request.
	function makeCorsRequest(method, url) {
	  // This is a sample server that supports CORS.

	  var xhr = createCORSRequest(method, url);
	  if (!xhr) {
		alert('CORS not supported');
		return;
	  }

	  // Response handlers.
	  xhr.onload = function() {
		var text = xhr.responseText;
		alert('Response from CORS request to ' + url + ' request text ' + text);
	  };

	  xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	  };

	  xhr.send(JSON.stringify(recipe));
	}
});


function debug_recipe() {
    console.log("=============================")
    console.log("update_recipe_info called");
    console.log(recipe)
    console.log("=============================")
};
