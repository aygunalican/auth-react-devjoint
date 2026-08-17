import { apiFetch } from "../../api/client";

export function getRecipes() {
  return apiFetch("/recipes");
}

export function createRecipe(data) {
  return apiFetch("/recipes", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateRecipe(id, data) {
  return apiFetch(`/recipes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteRecipe(id) {
  return apiFetch(`/recipes/${id}`, { method: "DELETE" });
}