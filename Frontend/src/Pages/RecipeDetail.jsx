import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipeById, likeRecipe } from "../api/RecipeAPI";
import { addComment, getComments } from "../api/CommentAPI";
import { toast } from "react-toastify";
import { Heart } from 'lucide-react';
import { AlarmClock } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { deleteRecipe } from "../api/RecipeAPI";



const RecipeDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [recipe, setRecipe] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getRecipeById(id).then((res) => setRecipe(res.data));
    getComments(id).then((res) => setComments(res.data));
  }, [id]);

  const like = async () => {
    console.log("LIKE TOKEN:", token);

    try {
      await likeRecipe(id, token);
      toast.info("❤️ Recipe liked!");
      setRecipe({ ...recipe, likes: recipe.likes + 1 });
    } catch {
      toast.error("❌ Login required");
    }
  };

  const comment = async () => {
    if (!text.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    await addComment(id, { text }, token);
    setText("");
    getComments(id).then((res) => setComments(res.data));
  };
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    try {
      await deleteRecipe(recipe._id, token);
      toast.success("🗑️ Recipe deleted");
      navigate("/");
    } catch (error) {
      toast.error("❌ Delete failed");
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div className="row g-0">

          {/* IMAGE */}
          <div className="col-12 col-md-6">
            {recipe.image && (
              <img
                src={`http://localhost:7005${recipe.image}`}
                alt={recipe.title}
                className="img-fluid w-100 h-100"
                style={{ objectFit: "cover", minHeight: "300px" }}
              />
            )}
          </div>

          {/* DETAILS */}
          <div className="col-12 col-md-6 p-4">
            <h2 className="fw-bold mb-2">{recipe.title}</h2>

            <span className="badge bg-secondary mb-3">
              <AlarmClock /> {recipe.cookingTime} mins
            </span>

            <p className="text-muted mt-3">
              {recipe.instructions}
            </p>

            <div className="d-flex align-item-center gap-3 mt-4 ">
              <button
                className="btn btn-outline-danger d-flex align-items-center gap-2 px-4"
                onClick={like}
              >
                <Heart size={18} />
                <span>{recipe.likes || 0}</span>
              </button>

              {token &&
                recipe.user?._id ===
                JSON.parse(atob(token.split(".")[1])).id && (
                  <Link
                    to={`/recipe/edit/${recipe._id}`}
                    className="btn btn-outline-secondary"
                  >
                    Edit
                  </Link>
                )}

              {token &&
                recipe.user?._id ===
                JSON.parse(atob(token.split(".")[1])).id && (
                  <button
                    className="btn btn-outline-danger ms-2"
                    onClick={handleDelete}
                  >
                     Delete
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>

      {/* COMMENTS */}
      <div className="row mt-5">
        <div className="col-12 col-md-8">
          <h4 className="fw-semibold mb-3">Comments</h4>

          {comments.length === 0 && (
            <div className="alert alert-light text-muted">
              No comments yet
            </div>
          )}

          {comments.map((c) => (
            <div
              key={c._id}
              className="card mb-2 border-0 shadow-sm"
            >
              <div className="card-body py-2">
                <h6 className="mb-1 fw-semibold">
                  {c.user?.name}
                </h6>
                <p className="mb-0 text-muted">{c.text}</p>
              </div>
            </div>
          ))}

          {token && (
            <div className="card mt-4 border-0 shadow-sm">
              <div className="card-body">
                <textarea
                  className="form-control mb-2"
                  rows="2"
                  placeholder="Write a comment..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />

                <button
                  className="btn btn-primary px-4"
                  onClick={comment}
                >
                  Add Comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default RecipeDetail;
