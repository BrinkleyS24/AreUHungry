$(document).ready(function() {
    let ingredientCount = 1;
  
    // Handle click event for adding ingredient input
    $('.add-ingredient').click(function() {
      ingredientCount++;
      const ingredientInput = `
        <div class="form-group">
          <label for="ingredient${ingredientCount}">Ingredient:</label>
          <input type="text" class="form-control ingredient" id="ingredient${ingredientCount}" name="ingredient${ingredientCount}" required>
        </div>
      `;
      $(ingredientInput).insertBefore('.form-group:last');
  
      // Show the minus button
      $('.remove-ingredient').show();
    });
  
    // Handle click event for removing ingredient input
    $('.remove-ingredient').click(function() {
      if (ingredientCount > 1) {
        $('.form-group:last').remove();
        ingredientCount--;
  
        // Hide the minus button if there is only one ingredient input
        if (ingredientCount === 1) {
          $('.remove-ingredient').hide();
        }
      }
    });
  
    // Hide the minus button initially if there is only one ingredient input
    if (ingredientCount === 1) {
      $('.remove-ingredient').hide();
    }
  
    // Handle form submission
    $('#mealForm').submit(function(event) {
      event.preventDefault();
      // Retrieve the values of all ingredient inputs
      const ingredients = [];
      $('.ingredient').each(function() {
        const ingredientValue = $(this).val();
        if (ingredientValue.trim() !== '') {
          ingredients.push(ingredientValue);
        }
      });
      // Use the retrieved ingredients to perform further actions (e.g., recipe search)
      // You can customize this part based on your requirements
      console.log('Ingredients:', ingredients);
      // Clear the form inputs
      $(this)[0].reset();
    });
  });
  