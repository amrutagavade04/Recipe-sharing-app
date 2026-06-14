import { useState } from "react";
import { registerUser } from '../api/UserAPI'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
  e.preventDefault();

  try {
    await registerUser(form);
    toast.success("🎉 Registration successful!");
    navigate("/login");
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "❌ Registration failed"
    );
  }
};


  return (
   <form
  className="container d-flex justify-content-center align-items-center"
  style={{ minHeight: "80vh" }}
  onSubmit={submit}
>
  <div className="col-12 col-sm-10 col-md-6 col-lg-4">
    <div className="card shadow-lg border-0 rounded-4">
      <div className="card-body p-4">
        <h3 className="text-center fw-bold mb-4">
          Create an Account
        </h3>

        <div className="mb-3">
          <label className="form-label fw-semibold">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            required
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

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
            placeholder="Create password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 fw-semibold"
        >
          Register
        </button>

        <p className="text-center text-muted mt-3 mb-0">
          Already have an account?{" "}
          <a href="/login" className="fw-semibold text-decoration-none">
            Login
          </a>
        </p>
      </div>
    </div>
  </div>
</form>

  );
};

export default RegisterPage;
