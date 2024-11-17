import React, { useState } from 'react';

function MealSearchForm() {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [includeIngredients, setIncludeIngredients] = useState('');
  const [excludeIngredients, setExcludeIngredients] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ query, cuisine, diet, includeIngredients, excludeIngredients });
    // Implement the fetch logic here
  };

  return (
    <form onSubmit={handleSubmit} className="meal-search-form">
      <input
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cuisine"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
      />
      <input
        type="text"
        placeholder="Diet"
        value={diet}
        onChange={(e) => setDiet(e.target.value)}
      />
      <input
        type="text"
        placeholder="Include Ingredients"
        value={includeIngredients}
        onChange={(e) => setIncludeIngredients(e.target.value)}
      />
      <input
        type="text"
        placeholder="Exclude Ingredients"
        value={excludeIngredients}
        onChange={(e) => setExcludeIngredients(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default MealSearchForm;
