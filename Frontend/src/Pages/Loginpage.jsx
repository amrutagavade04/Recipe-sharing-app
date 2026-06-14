import { useState } from "react";
import { loginUser } from "../api/UserAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Loginpage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    toast.success("✅ Login successful!");
   localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));

navigate("/home"); 

  } catch (error) {
    toast.error(
      error?.response?.data?.message || "❌ Invalid credentials"
    );
  }
};


  return (
    <form
  className="container d-flex justify-content-center align-items-center"
  style={{ minHeight: "80vh" }}
  onSubmit={handleSubmit}
>
  <div className="col-12 col-sm-10 col-md-6 col-lg-4">
    <div className="card shadow-lg border-0 rounded-4">
      <div className="card-body p-4">
        <h3 className="text-center fw-bold mb-4">
          Login to RecipeApp
        </h3>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 fw-semibold"
        >
          Login
        </button>

        <p className="text-center text-muted mt-3 mb-0">
          Don’t have an account?{" "}
          <a href="/register" className="fw-semibold text-decoration-none">
            Register
          </a>
        </p>
      </div>
    </div>
  </div>
</form>

  );
};

export default Loginpage;
