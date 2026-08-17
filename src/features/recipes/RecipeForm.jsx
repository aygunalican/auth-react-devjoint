import { useState } from "react";
import { useRecipes } from "./RecipesContext";

export default function RecipeForm() {
  const { addRecipe } = useRecipes();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("cake");
  const [prepTime, setPrepTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || title.trim().length < 3) {
      setError("Name must be at least 3 characters");
      return;
    }
    if (!prepTime || Number(prepTime) <= 0) {
      setError("Prep time is not valid");
      return;
    }
    if (!ingredients.trim()) {
      setError("Add some ingredients");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await addRecipe(title.trim(), category, Number(prepTime), ingredients.trim(), imageUrl.trim());
      setTitle("");
      setPrepTime("");
      setIngredients("");
      setImageUrl("");
      setCategory("cake");
    } catch (err) {
      setError("Could not save recipe, try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <input
        placeholder="Recipe name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="cake">Cake</option>
        <option value="cookie">Cookie</option>
        <option value="other">Other</option>
      </select>
      <input
        type="number"
        placeholder="Minutes"
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
      />
      <input
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <textarea
        placeholder="Ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add recipe"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}