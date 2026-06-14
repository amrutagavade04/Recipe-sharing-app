import { useState } from "react";
import { createRecipe } from "../api/RecipeAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
  });
  const navigate = useNavigate();


  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FORM STATE:", form); // ✅ DEBUG (must show filled data)

    if (
      !form.title ||
      !form.ingredients ||
      !form.instructions ||
      !form.cookingTime
    ) {
      toast.error("❌ All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append(
        "ingredients",
        JSON.stringify(form.ingredients.split(","))
      );
      formData.append("instructions", form.instructions);
      formData.append("cookingTime", form.cookingTime);

      if (image) {
        formData.append("image", image);
      }

      await createRecipe(formData, token);

      toast.success("🍽️ Recipe created successfully!");
       navigate("/home");

      // RESET FORM
      setForm({
        title: "",
        ingredients: "",
        instructions: "",
        cookingTime: "",
      });
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to create recipe");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="text-center fw-bold mb-4">
                Create New Recipe
              </h3>

              <form onSubmit={handleSubmit}>
                {/* TITLE */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Recipe Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter recipe title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>

                {/* INGREDIENTS */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Ingredients (comma separated)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="eg: onion, tomato, cheese"
                    value={form.ingredients}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        ingredients: e.target.value,
                      })
                    }
                  />
                </div>

                {/* INSTRUCTIONS */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Instructions
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Write cooking steps..."
                    value={form.instructions}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        instructions: e.target.value,
                      })
                    }
                  />
                </div>

                {/* COOKING TIME */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Cooking Time (minutes)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="eg: 30"
                    value={form.cookingTime}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        cookingTime: e.target.value,
                      })
                    }
                  />
                </div>

                {/* IMAGE */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Recipe Image (optional)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) =>
                      setImage(e.target.files[0])
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 fw-semibold"
                >
                  Create Recipe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
