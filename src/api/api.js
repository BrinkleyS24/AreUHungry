const API_KEY = process.env.REACT_APP_API_KEY;
const RANDOM_URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=100`;
const SEARCH_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;

export const fetchRandomRecipe = async () => {
  const response = await fetch(RANDOM_URL);
  return response.json();
};

export const searchRecipes = async (query, cuisine, diet, includeIngredients, excludeIngredients) => {
  const url = new URL(SEARCH_URL);
  url.searchParams.append("query", query);
  if (cuisine) url.searchParams.append("cuisine", cuisine);
  if (diet) url.searchParams.append("diet", diet);
  if (includeIngredients) url.searchParams.append("includeIngredients", includeIngredients);
  if (excludeIngredients) url.searchParams.append("excludeIngredients", excludeIngredients);
  
  const response = await fetch(url);
  return response.json();
};
