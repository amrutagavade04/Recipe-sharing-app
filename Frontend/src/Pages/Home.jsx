import { useEffect, useState } from "react";
import { getAllRecipes } from "../api/RecipeAPI";
import { Link } from "react-router-dom";
import { Heart } from 'lucide-react';


const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
  getAllRecipes().then(res => {
    console.log("RECIPES:", res.data);
    setRecipes(res.data); // ✅
  });
}, []);


  return (
    <div className="container mt-4">
  <div className="row">
    {recipes.map((recipe) => (
      <div
        key={recipe._id}
        className="col-12 col-sm-6 col-lg-4 mb-4"
      >
        <div className="card h-100 shadow-sm">
          {recipe.image && (
            <img
              src={`http://localhost:7005${recipe.image}`}
              className="card-img-top"
              style={{
                height: "200px",
                objectFit: "cover",
              }}
            />
          )}

          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{recipe.title}</h5>

            <p className="text-muted small">
              ⏱ {recipe.cookingTime} mins
            </p>

            <p className="card-text">
              {recipe.ingredients.slice(0, 3).join(", ")}...
            </p>

            <div className="mt-auto d-flex justify-content-between align-items-center">
              <Link
                to={`/recipe/${recipe._id}`}
                className="btn btn-sm btn-primary"
              >
                View
              </Link>

              <span className="badge bg-danger">
                <Heart />{recipe.likes}
              </span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Home;
