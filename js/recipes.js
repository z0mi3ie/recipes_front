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
    "title": "",
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

    // The text has changed in the recipe_title_input text
    $("#recipe_title_input").keyup(function() {
        recipe["title"] = $(this).val();
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
    });

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
});


function debug_recipe() {
    console.log("=============================")
    console.log("update_recipe_info called");
    console.log(recipe)
    console.log("=============================")
};

/* --------- Graveyard
//Remove the element from html
$(this).closest('li').remove();

function set_non_editable_ingredients() {
    var ingredientListElements = $('#ingredient-list li');
    ingredientListElements.each(function() {
        ingredientText = $(this).children(".ingredient").attr("contenteditable", "false");
        newList.push(ingredientText)
    });
}

function update_recipe_ingredient_list() {
    var ingredientListElements = $('#ingredient-list li');

    var newList = [];
    ingredientListElements.each(function() {
        console.log($(this).children(".ingredient").text());
        ingredientText = $(this).children(".ingredient").text();
        newList.push(ingredientText)
    });

    recipe["ingredients"] = newList;
}

function update_recipe_step_list() {
    var stepListElements = $('#step-list li');

    var newList = [];
    stepListElements.each(function() {
        console.log($(this).children(".step").text());
        stepText = $(this).children(".step").text();
        newList.push(stepText)
    });

    recipe["steps"] = newList;
}


*/
