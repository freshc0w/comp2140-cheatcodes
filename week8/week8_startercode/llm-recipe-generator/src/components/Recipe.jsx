import React from "react";

const Recipe = ({ recipe }) => (
  <div className="mt-4">
    <h2>{recipe.name}</h2>
    <h3>Ingredients:</h3>
    <ul>
      {recipe.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
      ))}
    </ul>
    <h3>Instructions:</h3>
    <ol>
      {recipe.instructions.map((step, index) => (
        <li key={index}>{step}</li>
      ))}
    </ol>
  </div>
);

export default Recipe;
