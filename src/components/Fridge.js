import React, { useState } from "react";

function Fridge({ fetchRecipesByIngredients, likedRecipes, setLikedRecipes }) {
    const [ingredients, setIngredients] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            setError(null); // Clear previous errors
            const result = await fetchRecipesByIngredients(ingredients);
            setRecipes(result);
        } catch (err) {
            setError("An error occurred while fetching recipes. Please try again.");
        }
    };

    const handleLikeRecipe = (recipe) => {
        // Structure recipe to match MealCard expectations
        const formattedRecipe = {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            servings: recipe.servings || "N/A", // Default if not provided
            readyInMinutes: recipe.readyInMinutes || "N/A",
            sourceUrl: recipe.sourceUrl || `https://spoonacular.com/recipes/${recipe.title
                .toLowerCase()
                .replace(/\s+/g, "-")}-${recipe.id}`,
            ingredients: recipe.usedIngredients
                ? recipe.usedIngredients.map((ing) => ing.originalString || ing.name)
                : ["Ingredients not available"],
            instructions: recipe.instructions
                ? recipe.instructions.split(".").filter((inst) => inst.trim() !== "")
                : ["Instructions not available"],
        };
    
        // Avoid duplicates
        if (!likedRecipes.some((liked) => liked.id === formattedRecipe.id)) {
            const updatedLikedRecipes = [...likedRecipes, formattedRecipe];
            setLikedRecipes(updatedLikedRecipes);
            localStorage.setItem("likedRecipes", JSON.stringify(updatedLikedRecipes));
        }
    };
    

    return (
        <div className="container mt-4">
            <h2 className="text-center">What's in Your Fridge?</h2>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter ingredients (comma-separated)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                </button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe.id} className="col-md-4 mb-4">
                            <FridgeMealCard
                                recipe={recipe}
                                onLike={() => handleLikeRecipe(recipe)}
                                isLiked={likedRecipes.some((liked) => liked.id === recipe.id)}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-center">No recipes found. Please try searching with different ingredients.</p>
                )}
            </div>
        </div>
    );
}

function FridgeMealCard({ recipe, onLike, isLiked }) {
    return (
        <div className="card meal-card">
            <h3 className="card-header bg-info">{recipe.title}</h3>
            <img
                src={recipe.image}
                className="card-img-top"
                alt={recipe.title}
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
                <p>
                    <strong>Used Ingredients:</strong>{" "}
                    {recipe.usedIngredients.map((ing) => ing.name).join(", ")}
                </p>
                <p>
                    <strong>Missing Ingredients:</strong>{" "}
                    {recipe.missedIngredients.map((ing) => ing.name).join(", ")}
                </p>
                <p>
                    <strong>Likes:</strong> {recipe.likes}
                </p>
            </div>
            <div className="card-footer d-flex justify-content-between align-items-center">
                <a
                    href={`https://spoonacular.com/recipes/${recipe.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}-${recipe.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                >
                    View Full Recipe
                </a>
                {isLiked ? (
                    <button className="btn btn-secondary" disabled>
                        Liked
                    </button>
                ) : (
                    <button className="btn btn-success" onClick={onLike}>
                        Like
                    </button>
                )}
            </div>
        </div>
    );
}

export default Fridge;
