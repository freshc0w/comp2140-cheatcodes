import React, { useState } from "react";
import { z } from "zod";
import RecipeDisplay from "./Recipe";
import Alert from "./Alert";

const recipeSchema = z.object({
  name: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
});

const RecipeGenerator = () => {
  const [ingredient, setIngredient] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateRecipe = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredient }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const data = await response.json();
      const validatedRecipe = recipeSchema.parse(data);
      setRecipe(validatedRecipe);
    } catch (err) {
      console.error(err);
      setError("Failed to generate or validate the recipe. Please try again.");
      setRecipe(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-2">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Enter main ingredient/s"
          disabled={isLoading}
        />
      </div>
      <button
        className="btn btn-primary mb-2"
        onClick={generateRecipe}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Recipe"}
      </button>

      {error && <Alert message={error} type="danger" />}
      {recipe && <RecipeDisplay recipe={recipe} />}
    </div>
  );
};

export default RecipeGenerator;
