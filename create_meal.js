$(document).ready(function () {
    const $likedRecipesNote = $('.quantity');
    const $likedRecipesDropdown = $('#likedRecipesDropdown');
    
    // Retrieve liked recipes from localStorage or initialize to an empty array
    let likedRecipesNote = JSON.parse(localStorage.getItem('likedRecipes')) || [];
    updateLikedRecipesNote();
    renderLikedRecipesDropdown();

    $('.add-ingredient').click(function () {
        $('#mealForm').append(`<div class="form-group">
            <label for="ingredient">Ingredient:</label>
            <input type="text" class="form-control ingredient" required>
        </div>`);
    });

    $('.remove-ingredient').click(function () {
        if ($('.ingredient').length > 1) {
            $('.ingredient').last().parent().remove();
        }
    });

    $('#mealForm').submit(function (event) {
        event.preventDefault();
        const ingredients = $('.ingredient').map(function () {
            return $(this).val().trim();
        }).get().join(',');

        fetchMeals(ingredients);
    });

    function fetchMeals(ingredients) {
        const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`;
        
        $.ajax(URL).then(function (data) {
            renderMeals(data.meals);
        }, function (error) {
            console.log('Something went wrong');
            console.log(error);
        });
    }

    function renderMeals(meals) {
        const $recipeResults = $('#recipeResults');
        $recipeResults.empty();
        
        if (meals) {
            meals.forEach(meal => {
                const mealCard = `
                    <div class="card m-2" style="width: 18rem;">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank" class="btn btn-primary">View Recipe</a>
                        </div>
                    </div>`;
                $recipeResults.append(mealCard);
            });
        } else {
            $recipeResults.html('<p>No meals found for the selected ingredients.</p>');
        }
    }

    function updateLikedRecipesNote() {
        $likedRecipesNote.text(likedRecipesNote.length);
    }

    function renderLikedRecipesDropdown() {
        $likedRecipesDropdown.empty();

        likedRecipesNote.forEach((meal, index) => {
            const $dropdownItem = $(`<li class="dropdown-item d-flex align-items-center justify-content-between">
                <div>
                    <img src="${meal.meals[0].strMealThumb}" alt="${meal.meals[0].strMeal}" style="width: 30px; height: 30px;">
                    <span>${meal.meals[0].strMeal}</span>
                </div>
                <button class="remove-item btn btn-sm btn-danger" data-index="${index}" style="padding: 0 5px; font-size: 0.8rem;">x</button>
            </li>`);
            $likedRecipesDropdown.append($dropdownItem);
        });

        $('.remove-item').on('click', function () {
            const index = $(this).data('index');
            likedRecipesNote.splice(index, 1);
            localStorage.setItem('likedRecipes', JSON.stringify(likedRecipesNote));
            updateLikedRecipesNote();
            renderLikedRecipesDropdown();
        });
    }
});
