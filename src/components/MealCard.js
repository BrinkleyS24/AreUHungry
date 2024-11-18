import React from 'react';

function MealCard({ meal, isLiked, onLike, onDislike }) {
    return (
        <div className="card meal-card">
            <h3 className="card-header bg-info">{meal.title}</h3>
            <img src={meal.image} className="card-img-top" alt={meal.title} />

            <div className="card-body" style={{ textAlign: 'left' }}>
                <p><strong>Servings:</strong> {meal.servings}</p>
                <p><strong>Ready in:</strong> {meal.readyInMinutes} minutes</p>
                <p>
                    <strong>Source:</strong>{' '}
                    <a href={meal.sourceUrl} target="_blank" rel="noreferrer">
                        Recipe Source
                    </a>
                </p>
                <ul >
                    <strong>Ingredients:</strong>
                    {meal.ingredients?.length ? (
                        meal.ingredients.map((ing, index) => <li key={index}>{ing}</li>)
                    ) : (
                        <li>No ingredients provided</li>
                    )}
                </ul>
                <div>
                    <h4>Instructions:</h4>
                    <ol>
                        {meal.instructions?.length ? (
                            meal.instructions.map((step, index) => <li key={index}>{step}</li>)
                        ) : (
                            <li>No instructions available.</li>
                        )}
                    </ol>
                </div>
            </div>


            <div className="card-footer d-flex justify-content-between">
                {isLiked ? (
                    <button className="btn btn-primary" onClick={onDislike}>
                        Next
                    </button>
                ) : (
                    <>
                        <button className="btn btn-danger" onClick={onDislike}>
                            Dislike
                        </button>
                        <button className="btn btn-success" onClick={onLike}>
                            Like
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default MealCard;
