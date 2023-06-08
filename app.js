const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
const toDo = [];

const $getMeal = $('#getMeal');
const $main = $('main');
const $right = $('.right');

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

// Select the appropriate element(s) for $li and attach the click event handler
$('ul').on('click', 'li', function () {
    const meal = toDo[$(this).index()];
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    $main.html(`
      <div class="card"> 
        <h3 class="card-header bg-info">Meal: ${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
        <div class="card-body">
          <ul><strong>Ingredients:</strong> 
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join(' ')}
          </ul> 
          <p><strong>Instructions:</strong> ${meal.strInstructions}</p>
        </div>
      </div> 
    `);
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

    $('main').html(`
    <div class="card"> 
    <h3 class="card-header bg-info">Meal: ${meal.meals[0].strMeal}</h3>
    <img src="${meal.meals[0].strMealThumb}" class="card-img-top" alt="${meal.meals[0].strMeal}">
    <div class="card-body">
    <ul><strong>Ingredients:</strong> ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join(' ')}</ul> 
    <p><strong>Instructons:</strong> ${meal.meals[0].strInstructions}</p>
    </div>
    <div class="card-footer">
    ${toDo.includes(meal) ?
        '<button class="next btn btn-primary">Next</button>' :
        '<button class="dislike btn btn-danger">Dislike</button> <button class="like btn btn-success">Like</button>'
    }
    </div>
    </div> 
    `);

    $('.dislike').on('click', handleGetMeal);

    $('.like').on('click', function () {
        toDo.push(meal);

        const $ul = $('ul');
        const $li = $(`<li class="toDoMeal">${meal.meals[0].strMeal} 
                    <button class="delete">X</button>
                   </li>`);

        if (!$right.find('h5').length) {
            $right.prepend('<h5>To Make List:</h5>');
        }

        $ul.append($li);
        $li.on('click', '.delete', function () {
            $(this).closest('li').remove();
            if (!$right.find('li').length) {
                $right.find('h5').remove();
            }
        });

        $('.toDoMeal').on('click', function () {
            const clickedMeal = toDo[$(this).index()];
            render(clickedMeal);
        });

        handleGetMeal();
    });

    $('.next').on('click', handleGetMeal);
}
