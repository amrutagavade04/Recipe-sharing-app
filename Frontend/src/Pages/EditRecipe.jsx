import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeById, updateRecipe } from "../api/RecipeAPI";
import { toast } from "react-toastify";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cookingTime: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    getRecipeById(id).then((res) => {
      const r = res.data;
      setForm({
        title: r.title,
        ingredients: r.ingredients.join(","),
        instructions: r.instructions,
        cookingTime: r.cookingTime,
      });
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append(
        "ingredients",
        JSON.stringify(form.ingredients.split(","))
      );
      formData.append("instructions", form.instructions);
      formData.append("cookingTime", form.cookingTime);

      if (image) formData.append("image", image);

      await updateRecipe(id, formData, token);

      toast.success(" Recipe updated successfully!");
      navigate(`/recipe/${id}`);
    } catch (err) {
      toast.error("❌ Update failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow p-4">
            <h4 className="text-center mb-3">
              Edit Recipe
            </h4>

            <form onSubmit={submit}>
              <input
                className="form-control mb-2"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                value={form.ingredients}
                onChange={(e) =>
                  setForm({
                    ...form,
                    ingredients: e.target.value,
                  })
                }
              />

              <textarea
                className="form-control mb-2"
                rows="4"
                value={form.instructions}
                onChange={(e) =>
                  setForm({
                    ...form,
                    instructions: e.target.value,
                  })
                }
              />

              <input
                type="number"
                className="form-control mb-2"
                value={form.cookingTime}
                onChange={(e) =>
                  setForm({
                    ...form,
                    cookingTime: e.target.value,
                  })
                }
              />

              <input
                type="file"
                className="form-control mb-3"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <button className="btn btn-primary w-100">
                Update Recipe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
