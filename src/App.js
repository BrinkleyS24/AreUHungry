import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';

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
        return {
            id: meal.id,
            title: meal.title,
            image: meal.image,
            servings: meal.servings,
            readyInMinutes: meal.readyInMinutes,
            sourceUrl: meal.sourceUrl,
            ingredients: meal.extendedIngredients.map((ing) => ing.original),
            instructions: meal.instructions
                ? meal.instructions.replace(/<[^>]+>/g, '').split(/(?<=\d\.\s)/g)
                : ['No instructions provided.'],
        };
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
            <Main
                fetchRandomMeal={fetchRandomMeal}
                likedRecipes={likedRecipes}
                updateLikedRecipes={updateLikedRecipes}
                currentMeal={currentMeal}
            />
        </div>
    );
}

export default App;
