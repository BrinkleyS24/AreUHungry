// variables
const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const toDO = [];
const $h5 = $("<h5></h5>").text("To Make List ");


// element references
const $getMeal = $('#getMeal');
const $dislike = $('.dislike');
const $like = $('like');
const $ul = $('ul')
const $right = $('.right')

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
    <h3 class="card-header bg-info">Meal: ${meal.meals[0].strMeal}</h3>
    <img src="${meal.meals[0].strMealThumb}" class="card-img-top" alt="${meal.meals[0].strMeal}">
    <div class="card-body">
    <ul><strong>Ingredients:</strong> ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join(' ')}</ul> 
    <p><strong>Instructons:</strong> ${meal.meals[0].strInstructions}</p>
    </div>
    <div class="card-footer">
    <button class="dislike btn btn-danger">Dislike</button> <button class="like btn btn-success">Like</button>
    </div>
    </div> 
    `);


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
            $right.prepend($h5);
            toDO.push(meal.meals[0].strMeal);
            $ul.append(`<li>${meal.meals[0].strMeal} <button class="delete btn btn-danger btn-sm">X</button></li>`);
            $ul.on('click', '.delete', function () {
                $(this).closest('li').remove();
            });
            render(data);
        });
    });
};
