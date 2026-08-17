import RecipeForm from "../features/recipes/RecipeForm";
import RecipeList from "../features/recipes/RecipeList";

export default function DashboardPage() {
  return (
    <div>
      <h2>My Sweet Recipes</h2>
      <RecipeForm />
      <RecipeList />
    </div>
  );
}