import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetailPage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            const API_KEY = process.env.REACT_APP_API_KEY;
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
                );
                const data = await response.json();
                setRecipe(data);
            } catch (err) {
                setError('Failed to load recipe details.');
            } finally {
                setLoading(false);
            }
        };
        fetchRecipeDetails();
    }, [id]);

    if (loading) return <p>Loading recipe details...</p>;
    if (error) return <p>{error}</p>;
    if (!recipe) return <p>Recipe not found.</p>;

    return (
        <div className="card meal-card">
            <h3 className="card-header bg-info">{recipe.title}</h3>
            <img
                src={recipe.image}
                className="card-img-top"
                alt={recipe.title}
                style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                }}
            />
            <div className="card-body">
                <p><strong>Servings:</strong> {recipe.servings}</p>
                <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
                <p>
                    <strong>Source:</strong>{' '}
                    <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
                        Recipe Source
                    </a>
                </p>
                <h4>Ingredients:</h4>
                <ul >
                    {recipe.extendedIngredients?.length ? (
                        recipe.extendedIngredients.map((ing, index) => (
                            <li key={index}>{ing.original}</li>
                        ))
                    ) : (
                        <li>No ingredients provided</li>
                    )}
                </ul>
                <h4>Instructions:</h4>
                <ol>
                    {recipe.analyzedInstructions.length > 0 ? (
                        recipe.analyzedInstructions[0].steps.map((step) => (
                            <li key={step.number}>{step.step}</li>
                        ))
                    ) : (
                        <p>No instructions provided.</p>
                    )}
                </ol>
            </div>
            <div className="card-footer">
                <a
                    href={recipe.sourceUrl}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noreferrer"
                >
                    View Full Recipe
                </a>
            </div>
        </div>
    );
}

export default RecipeDetailPage;
