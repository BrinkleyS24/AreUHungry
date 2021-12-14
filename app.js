// variables
const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

// element references
const $getMeal = $('#getMeal');
const $dislike = $('.dislike');
const $like = $('like');

// // event listeners
$getMeal.on('click', handleGetMeal);
// $dislike.on('click', skipMeal)

// functions

function handleGetMeal(evt) {

    $.ajax(URL).then(function (data) {
        render(data);
        // console.log(data.meals[0].strMeal)
    }, function (error) {
        console.log('something went wrong')
        console.log(error);
    })
};

// function skipMeal(evt) {
//     // $.ajax(URL).then(function (data) {
//     //     render(data);
//          console.log(data.meals[0].strMeal)
//     // }, function (error) {
//     //     console.log('something went wrong')
//     //     console.log(error);
//     // })
// }

function render(meal) {
    $('main').html(`
    <h3> Title: ${meal.meals[0].strMeal}</h3 >
    <img src="${meal.img}" alt="${meal.meals[0].strMeal}">
    
    <p>Instructons: ${meal.meals[0].strInstructions}</p>
    <button class="dislike">Dislike</button> <button clss="like">Like</button>
    `);
    $('.dislike').on('click', function() {
        $.ajax(URL).then(function (data) {
            render(data);
            // console.log(data.meals[0].strMeal)
        }, function (error) {
            console.log('something went wrong')
            console.log(error);
        })
    })
};
