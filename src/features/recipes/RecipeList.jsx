import { useRecipes } from "./RecipesContext";
import RecipeCard from "./RecipeCard";

export default function RecipeList() {
  const { recipes, status, error } = useRecipes();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p className="error">Error: {error}</p>;
  if (recipes.length === 0) return <p>No recipes yet.</p>;

  return (
    <ul className="recipe-list">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </ul>
  );
}