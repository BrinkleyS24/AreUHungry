$(document).ready(function () {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const likedRecipesNote = []; // Change to camelCase
    const $likedRecipesNote = $('.quantity'); // Update selector to target the quantity span
    const $likedRecipesDropdown = $('#likedRecipesDropdown');
    const $getMeal = $('#getMeal');
    const $main = $('main');

    $getMeal.on('click', handleGetMeal);

    function handleGetMeal(evt) {
        $.ajax(URL).then(function (data) {
            render(data);
        }, function (error) {
            console.log('something went wrong');
            console.log(error);
        });

        $(this).remove();
    }

    $('ul').on('click', 'li', function () {
        const meal = likedRecipesNote[$(this).index()];
        render(meal);
    });

    function render(meal) {
        const ingredients = [];

        for (let i = 1; i <= 20; i++) {
            if (meal.meals[0][`strIngredient${i}`]) {
                ingredients.push(`${meal.meals[0][`strIngredient${i}`]} - ${meal.meals[0][`strMeasure${i}`]}`);
            } else {
                break;
            }
        }

        $main.html(`
            <div class="card"> 
                <h3 class="card-header bg-info">${meal.meals[0].strMeal}</h3>
                <img src="${meal.meals[0].strMealThumb}" class="card-img-top" alt="${meal.meals[0].strMeal}">
                <div class="card-body">
                    <ul><strong>Ingredients:</strong> ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join(' ')}</ul> 
                    <p><strong>Instructions:</strong> ${meal.meals[0].strInstructions}</p>
                </div>
                <div class="card-footer">
                    ${likedRecipesNote.includes(meal) ?
                        '<button class="next btn btn-primary">Next</button>' :
                        '<button class="dislike btn btn-danger">Dislike</button> <button class="like btn btn-success">Like</button>'
                    }
                </div>
            </div> 
        `);

        $('.dislike').on('click', handleGetMeal);

        $('.like').on('click', function () {
            likedRecipesNote.push(meal);
            updateLikedRecipesNote(); // Update the quantity after adding a meal
            renderNextMeal();
            renderLikedRecipesDropdown();
        });

        $('.next').on('click', handleGetMeal);
    }

    function updateLikedRecipesNote() {
        // Update the quantity span with the length of likedRecipesNote array
        $likedRecipesNote.text(likedRecipesNote.length);
    }

    function renderLikedRecipesDropdown() {
        $likedRecipesDropdown.empty(); // Clear previous items
        likedRecipesNote.forEach(meal => {
            const $dropdownItem = $(`
                <li>
                    <a class="dropdown-item" href="#">
                        <img src="${meal.meals[0].strMealThumb}" alt="${meal.meals[0].strMeal}" style="width: 30px; height: 30px;">
                        <span>${meal.meals[0].strMeal}</span>
                    </a>
                </li>
            `);
            $likedRecipesDropdown.append($dropdownItem);
        });
        console.log('Dropdown updated with liked recipes:', likedRecipesNote); // Check if dropdown is updated
    }

    function renderNextMeal() {
        $.ajax(URL).then(function (data) {
            render(data);
        }, function (error) {
            console.log('something went wrong');
            console.log(error);
        });
    }

    

    
});

