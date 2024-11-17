import React, { useState, useEffect } from 'react';
import MealCard from './MealCard';

function Main({ fetchRandomMeal, likedRecipes, updateLikedRecipes, currentMeal }) {
    const [displayedMeal, setDisplayedMeal] = useState(null);

    useEffect(() => {
        if (currentMeal) {
            setDisplayedMeal(currentMeal); 
            fetchMeal(); 
        }
    }, [currentMeal]);

    const fetchMeal = async () => {
        const meal = await fetchRandomMeal();
        setDisplayedMeal(meal);
    };

    const handleLike = () => {
        updateLikedRecipes(displayedMeal);
        fetchMeal();
    };

    const handleDislike = () => {
        fetchMeal();
    };

    return (
        <div className="main">
            {displayedMeal && (
                <MealCard
                    meal={displayedMeal}
                    isLiked={likedRecipes.some((meal) => meal.id === displayedMeal.id)}
                    onLike={handleLike}
                    onDislike={handleDislike}
                />
            )}
        </div>
    );
}

export default Main;

