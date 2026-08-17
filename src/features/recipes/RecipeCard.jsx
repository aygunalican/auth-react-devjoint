import { useRecipes } from "./RecipesContext";

export default function RecipeCard({ recipe }) {
  const { toggleTried, removeRecipe } = useRecipes();

  return (
    <li className={recipe.tried ? "recipe done" : "recipe"}>
      <div className="recipe-img">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.title} />
        ) : (
          <div className="no-img">🍰</div>
        )}
      </div>
      <div className="recipe-info">
        <div className="recipe-top">
          <span>{recipe.title}</span>
          <span className="badge">{recipe.category}</span>
        </div>
        <p className="ingredients">{recipe.ingredients}</p>
        <p className="time">{recipe.prepTime} min</p>
        <label>
          <input
            type="checkbox"
            checked={recipe.tried}
            onChange={() => toggleTried(recipe.id)}
          />
          Tried it
        </label>
        <button onClick={() => removeRecipe(recipe.id)}>Delete</button>
      </div>
    </li>
  );
}