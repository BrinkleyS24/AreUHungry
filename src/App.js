import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Main from './components/Main';
import Fridge from './components/Fridge'; 
import RecipeDetailPage from './components/RecipeDetailPage'

function App() {
    const [likedRecipes, setLikedRecipes] = useState(() => {
        return JSON.parse(localStorage.getItem("likedRecipes")) || [];
    });
    const [currentMeal, setCurrentMeal] = useState(null);

    const fetchRandomMeal = async () => {
        const API_KEY = process.env.REACT_APP_API_KEY;
    
        const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}`);
        const data = await response.json();
        const meal = data.recipes[0];
    
        const recipeId = meal.id;
        const detailedResponse = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${API_KEY}`);
        const detailedData = await detailedResponse.json();
    
        return {
            id: meal.id,
            title: meal.title,
            image: meal.image,
            servings: meal.servings,
            readyInMinutes: meal.readyInMinutes,
            sourceUrl: meal.sourceUrl,
            ingredients: detailedData.extendedIngredients.map((ing) => ing.original),
            instructions: detailedData.analyzedInstructions.length > 0
                ? detailedData.analyzedInstructions[0].steps.map(step => step.step)
                : ['No instructions provided.'],
        };
    };
    

    const fetchRecipesByIngredients = async (ingredients) => {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const response = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&ranking=1&ignorePantry=true&apiKey=${API_KEY}`
        );
        const data = await response.json();
        return data;
    };

    const updateLikedRecipes = (meal) => {
        setLikedRecipes((prev) => [...prev, meal]);
    };

    const handleSelectMeal = (meal) => {
        setCurrentMeal(meal);
    };

    return (
        <div className="container">
            <Navbar
                likedRecipes={likedRecipes}
                setLikedRecipes={setLikedRecipes}
                onSelectMeal={handleSelectMeal}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Main
                            fetchRandomMeal={fetchRandomMeal}
                            likedRecipes={likedRecipes}
                            updateLikedRecipes={updateLikedRecipes}
                            currentMeal={currentMeal}
                        />
                    }
                />
                <Route
                    path="/fridge"
                    element={
                        <Fridge
                            fetchRecipesByIngredients={fetchRecipesByIngredients}
                            likedRecipes={likedRecipes}
                            setLikedRecipes={setLikedRecipes}
                        />
                    }
                />
                <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            </Routes>
        </div>
    );
}

export default App;
