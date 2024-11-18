import React, { useState, useEffect } from 'react';
import MealCard from './MealCard';

function Main({ fetchRandomMeal, likedRecipes, updateLikedRecipes, currentMeal }) {
    const [displayedMeal, setDisplayedMeal] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (currentMeal) {
            
            setDisplayedMeal(currentMeal);
            setHasFetched(true);
        }
    }, [currentMeal]);

    const fetchMeal = async () => {
        const meal = await fetchRandomMeal();
        setDisplayedMeal(meal);
        setHasFetched(true);
    };
    

    const handleLike = async () => {
        updateLikedRecipes(displayedMeal); 
        const newMeal = await fetchRandomMeal(); 
        setDisplayedMeal(newMeal);
    };

    const handleDislike = async () => {
        const newMeal = await fetchRandomMeal(); 
        setDisplayedMeal(newMeal);
    };

    return (
        <div className="main text-center">
            {!hasFetched ? (
                <>
                    <h2>Are U Hungry?</h2>
                    <h6>Hit the button below and find your next meal!</h6>
                    <button
                        className="btn btn-primary my-3"
                        onClick={fetchMeal}
                    >
                        Give Me Something Good...
                    </button>
                </>
            ) : (
                displayedMeal && (
                    <MealCard
                        meal={displayedMeal}
                        isLiked={likedRecipes.some((meal) => meal.id === displayedMeal.id)}
                        onLike={handleLike}
                        onDislike={handleDislike}
                    />
                )
            )}
        </div>
    );
}

export default Main;
