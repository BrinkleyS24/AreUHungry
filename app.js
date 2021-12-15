// variables
const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const toDO = [];


// element references
const $getMeal = $('#getMeal');
const $dislike = $('.dislike');
const $like = $('like');
const $ul = $('ul')

// // event listeners
$getMeal.on('click', handleGetMeal);


// functions


function handleGetMeal(evt) {

    $.ajax(URL).then(function (data) {
        render(data);
    }, function (error) {
        console.log('something went wrong');
        console.log(error);
    });
    $(this).remove();
};



function render(meal) {

    let ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal.meals[0]["strIngredient" + i]) {
            ingredients.push(
                `${meal.meals[0][`strIngredient${i}`]} - ${meal.meals[0][`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }

    $('main').html(`
    <div class="card">
    <div class="card-header"><h3>Meal: ${meal.meals[0].strMeal}</h3></div>
    <div class="card-body">
    <img src="${meal.meals[0].strMealThumb}" class="card-img-top" alt="${meal.meals[0].strMeal}">
    <p><strong>Ingredients:</strong> ${ingredients.map(ingredients => `<li>${ingredients}</li>`)}</p>
    <p class="right"><strong>Instructons:</strong> ${meal.meals[0].strInstructions}</p>
    <div class="card-footer">
    <button class="dislike">Dislike</button> <button class="like">Like</button>
    </div>
    </div>
    </div>
    `);
    console.log(meal.meals[0]);

    $('.dislike').on('click', function () {
        $.ajax(URL).then(function (data) {
            render(data);
        }, function (error) {
            console.log('something went wrong');
            console.log(error);
        });
    });

    $('.like').on('click', function () {
        $.ajax(URL).then(function (data) {
            toDO.push(meal.meals[0].strMeal);
            $ul.append(`<li>${meal.meals[0].strMeal} <button class="delete">X</button></li>`);
            $ul.on('click','.delete', function () {
                $(this).closest('li').remove();
            });
            render(data);
        });
    });
};
