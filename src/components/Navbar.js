import { Link } from 'react-router-dom';

function Navbar({ likedRecipes, setLikedRecipes, onSelectMeal }) {
    const handleRemoveRecipe = (index) => {
        const updatedRecipes = likedRecipes.filter((_, i) => i !== index);
        setLikedRecipes(updatedRecipes);
        localStorage.setItem("likedRecipes", JSON.stringify(updatedRecipes));
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Are U Hungry?</a>
                <div className="navbar-nav">
                    <Link className="nav-link" to="/">Home</Link> {/* Home link */}
                    <Link className="nav-link" to="/fridge">What's in Your Fridge?</Link> {/* New tab */}
                </div>
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Saved Recipes ({likedRecipes.length})
                    </button>
                    <ul className="dropdown-menu p-2" style={{ minWidth: "300px" }}>
                        {likedRecipes.map((meal, index) => (
                            <li
                                key={index}
                                className="dropdown-item d-flex align-items-center justify-content-between gap-3"
                                style={{ borderBottom: "1px solid #ddd", padding: "8px 0" }}
                            >
                                <div className="d-flex align-items-center flex-grow-1">
                                    <img
                                        src={meal.image}
                                        alt={meal.title}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            marginRight: "10px",
                                            borderRadius: "5px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Link
                                        to={`/recipe/${meal.id}`} // Navigate to recipe details page
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        <span className="text-truncate" style={{ maxWidth: "180px" }}>
                                            {meal.title}
                                        </span>
                                    </Link>
                                </div>
                                <button
                                    className="remove-item btn btn-sm btn-danger"
                                    style={{
                                        padding: "4px 8px",
                                        fontSize: "0.8rem",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveRecipe(index);
                                    }}
                                >
                                    x
                                </button>
                            </li>
                        ))}
                        {likedRecipes.length === 0 && (
                            <li className="dropdown-item text-center">
                                No saved recipes yet!
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
