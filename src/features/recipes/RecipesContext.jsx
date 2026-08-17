import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from "./recipesApi";

const RecipesContext = createContext(null);

const initialState = {
  recipes: [],
  status: "idle",
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...state, status: "loading" };
    case "SUCCESS":
      return { ...state, status: "idle", recipes: action.data };
    case "ERROR":
      return { ...state, status: "error", error: action.data };
    case "ADD":
      return { ...state, recipes: [...state.recipes, action.data] };
    case "REMOVE":
      return { ...state, recipes: state.recipes.filter((r) => r.id !== action.id) };
    case "UPDATE":
      return {
        ...state,
        recipes: state.recipes.map((r) =>
          r.id === action.id ? { ...r, ...action.data } : r
        ),
      };
    default:
      return state;
  }
}

export function RecipesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getRecipes()
      .then((data) => dispatch({ type: "SUCCESS", data }))
      .catch((err) => dispatch({ type: "ERROR", data: err.message }));
  }, []);

  const addRecipe = useCallback(
    async (title, category, prepTime, ingredients, imageUrl) => {
      const tempRecipe = {
        id: "temp-" + Date.now(),
        title,
        category,
        prepTime,
        ingredients,
        imageUrl,
        tried: false,
      };
      const backup = state.recipes;

      dispatch({ type: "ADD", data: tempRecipe });

      try {
        const saved = await createRecipe({ title, category, prepTime, ingredients, imageUrl, tried: false });
        dispatch({ type: "SUCCESS", data: [...backup, saved] });
      } catch (err) {
        dispatch({ type: "SUCCESS", data: backup });
        throw err;
      }
    },
    [state.recipes]
  );

  const toggleTried = useCallback(
    async (id) => {
      const backup = state.recipes;
      const recipe = backup.find((r) => r.id === id);
      if (!recipe) return;

      dispatch({ type: "UPDATE", id, data: { tried: !recipe.tried } });

      try {
        await updateRecipe(id, { tried: !recipe.tried });
      } catch (err) {
        dispatch({ type: "SUCCESS", data: backup });
      }
    },
    [state.recipes]
  );

  const removeRecipe = useCallback(
    async (id) => {
      const backup = state.recipes;
      dispatch({ type: "REMOVE", id });

      try {
        await deleteRecipe(id);
      } catch (err) {
        dispatch({ type: "SUCCESS", data: backup });
      }
    },
    [state.recipes]
  );

  return (
    <RecipesContext.Provider value={{ ...state, addRecipe, toggleTried, removeRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const ctx  = useContext(RecipesContext);
  if (!ctx) throw new Error("useRecipes must be used inside RecipesProvider");
  return ctx;
}