$(document).ready(function () {
    const apiKey = '44bdadcda9644144a4d9c6e5fe4c3096';  

    const RANDOM_URL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;
    const SEARCH_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=`;
    const $likedRecipesNote = $('.quantity');
    const $likedRecipesDropdown = $('#likedRecipesDropdown');
    const $getMeal = $('#getMeal');
    const $main = $('main');
    const $searchInput = $('#searchInput');
    const $mealSearchForm = $('#mealSearchForm');
    const $cuisineInput = $('#cuisineInput');  
    const $dietInput = $('#dietInput');  
    const $includeIngredientsInput = $('#includeIngredientsInput'); 
    const $excludeIngredientsInput = $('#excludeIngredientsInput');  

    let likedRecipesNote = JSON.parse(localStorage.getItem('likedRecipes')) || [];
    updateLikedRecipesNote();
    renderLikedRecipesDropdown();

    $getMeal.on('click', handleGetMeal);

    $mealSearchForm.on('submit', function (e) {
        e.preventDefault();  
        const query = $searchInput.val().trim();
        const cuisine = $cuisineInput.val().trim();
        const diet = $dietInput.val().trim();
        const includeIngredients = $includeIngredientsInput.val().trim();
        const excludeIngredients = $excludeIngredientsInput.val().trim();


        if (query) {
            searchMeal(query, cuisine, diet, includeIngredients, excludeIngredients);
        } else {
            $main.html('<p>Please enter a search query.</p>');
        }
    });


    function handleGetMeal() {
        $.ajax(RANDOM_URL).then(function (data) {
            render(data);
        }, function (error) {
            console.log('something went wrong');
            console.log(error);
        });
    }

    function searchMeal(query, cuisine, diet, includeIngredients, excludeIngredients) {
        let searchUrl = SEARCH_URL + query + '&addRecipeInformation=true&number=100';

        if (cuisine) searchUrl += `&cuisine=${cuisine}`;
        if (diet) searchUrl += `&diet=${diet}`;
        if (includeIngredients) searchUrl += `&includeIngredients=${includeIngredients}`;
        if (excludeIngredients) searchUrl += `&excludeIngredients=${excludeIngredients}`;

        // Debugging: Log the search URL to verify it's correct
        console.log("Search URL:", searchUrl);

        // Make sure the request is being sent and log any responses or errors
        $.ajax({
            url: searchUrl,
            method: 'GET',
            success: function (data) {
                console.log('API Data:', data);
                if (data.results && data.results.length) {
                    renderSearchResults(data);
                } else {
                    $main.html('<p>No recipes found with your filters.</p>');
                }
            },
            error: function (error) {
                console.log('Error occurred during search request:', error);
                $main.html('<p>Something went wrong. Please try again later.</p>');
            }
        });
    }




    function render(mealData) {
        const meal = mealData.recipes[0];

        const ingredients = meal.extendedIngredients.map(ingredient =>
            `${ingredient.original}`
        );

        $main.html(`
            <div class="card"> 
                <h3 class="card-header bg-info">${meal.title}</h3>
                <img src="${meal.image}" class="card-img-top" alt="${meal.title}">
                <div class="card-body">
                    <p><strong>Servings:</strong> ${meal.servings}</p>
                    <p><strong>Ready in:</strong> ${meal.readyInMinutes} minutes</p>
                    <p><strong>Source:</strong> <a href="${meal.sourceUrl}" target="_blank">${meal.sourceName || 'Recipe Source'}</a></p>
                    <ul><strong>Ingredients:</strong> ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join(' ')}</ul> 
                    <p><strong>Instructions:</strong> ${meal.instructions}</p>
                </div>
                <div class="card-footer">
                    ${likedRecipesNote.some(likedMeal => likedMeal.id === meal.id) ?
                '<button class="next btn btn-primary">Next</button>' :
                '<button class="dislike btn btn-danger">Dislike</button> <button class="like btn btn-success">Like</button>'
            }
                </div>
            </div> 
        `);

        $('.dislike').on('click', handleGetMeal);

        $('.like').on('click', function () {
            likedRecipesNote.push(meal);
            localStorage.setItem('likedRecipes', JSON.stringify(likedRecipesNote));
            updateLikedRecipesNote();
            renderNextMeal();
            renderLikedRecipesDropdown();
        });

        $('.next').on('click', handleGetMeal);
    }

    function renderSearchResults(mealData) {
        const meals = mealData.results;
        
        if (meals.length === 0) {
            $main.html('<p>No recipes found with your filters.</p>');
        } else {
            $main.html(meals.map(meal => renderMealCard(meal)).join(''));
    
            // Add click event for each meal card
            $('.meal-card').on('click', function (e) {
                e.preventDefault();
                const mealId = $(this).data('meal-id');
                fetchRecipeDetails(mealId).then(fullMealData => {
                    render({ recipes: [fullMealData] }); // Render the full meal details
                });
            });
        }
    }
    

    // Helper function to render each meal card
    function renderMealCard(meal) {
        return `
            <div class="card meal-card" data-meal-id="${meal.id}">
                <h3 class="card-header bg-info">${meal.title}</h3>
                <img src="${meal.image}" class="card-img-top" alt="${meal.title}">
                <div class="card-body">
                    <p><strong>Servings:</strong> ${meal.servings || 'N/A'}</p>
                    <p><strong>Ready in:</strong> ${meal.readyInMinutes ? meal.readyInMinutes + ' minutes' : 'N/A'}</p>
                    <p><strong>Source:</strong> <a href="${meal.sourceUrl || '#'}" target="_blank">${meal.sourceUrl ? 'Recipe Source' : 'No source available'}</a></p>
                    <p><strong>Summary:</strong> ${meal.summary || 'Not available'}</p>
                </div>
            </div>
        `;
    }


    // Function to fetch full recipe details (including instructions) if not present in search results
    function fetchRecipeDetails(recipeId) {
        const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                return data; // Return full recipe details
            })
            .catch(error => {
                console.error('Error fetching recipe details:', error);
                return { instructions: 'Not available' }; // Fallback if something goes wrong
            });
    }


    function updateLikedRecipesNote() {
        $likedRecipesNote.text(likedRecipesNote.length);
    }

    function renderLikedRecipesDropdown() {
        $likedRecipesDropdown.empty();

        likedRecipesNote.forEach((meal, index) => {
            const $dropdownItem = $(`
                <li class="dropdown-item d-flex align-items-center justify-content-between">
                    <div>
                        <img src="${meal.image}" alt="${meal.title}" style="width: 30px; height: 30px;">
                        <span>${meal.title}</span>
                    </div>
                    <button class="remove-item btn btn-sm btn-danger" data-index="${index}" style="padding: 0 5px; font-size: 0.8rem;">x</button>
                </li>
            `);
            $likedRecipesDropdown.append($dropdownItem);

            // Add the event listener for the 'view' button click to render the selected saved recipe
            $dropdownItem.on('click', function () {
                render({ recipes: [meal] });  // Render the clicked saved meal
            });
        });

        // Remove an item from the liked recipes
        $('.remove-item').on('click', function (e) {
            e.stopPropagation();  // Prevent triggering the click event for viewing
            const index = $(this).data('index');
            likedRecipesNote.splice(index, 1);
            localStorage.setItem('likedRecipes', JSON.stringify(likedRecipesNote));
            updateLikedRecipesNote();
            renderLikedRecipesDropdown();
        });
    }


    function renderNextMeal() {
        $.ajax(RANDOM_URL).then(function (data) {
            render(data);
        }, function (error) {
            console.log('something went wrong');
            console.log(error);
        });
    }
});
