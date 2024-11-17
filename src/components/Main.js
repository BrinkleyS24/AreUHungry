import React, { useState, useEffect } from 'react';
import MealCard from './MealCard';

function Main({ fetchRandomMeal, likedRecipes, updateLikedRecipes, currentMeal }) {
    const [displayedMeal, setDisplayedMeal] = useState(null);

    // Fetch a meal if no currentMeal is provided
    useEffect(() => {
        if (!currentMeal) {
            fetchMeal();
        } else {
            setDisplayedMeal(currentMeal);
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
            {displayedMeal ? (
                <MealCard
                    meal={displayedMeal}
                    isLiked={likedRecipes.some((meal) => meal.id === displayedMeal.id)}
                    onLike={handleLike}
                    onDislike={handleDislike}
                />
            ) : (
                <p>Loading meal...</p>
            )}
        </div>
    );
}

export default Main;
