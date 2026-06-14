import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2"
          to="/"
        >
          🍽️
          <img
            src="https://img.freepik.com/premium-vector/chef-recipe-logo-design-vector-illustration-white-background_685330-3470.jpg"
            alt="RecipeApp Logo"
            className="rounded-circle shadow-sm"
            style={{ height: "40px", width: "40px", objectFit: "cover" }}
          />
          <span className="d-none d-sm-inline">RecipeApp</span>
        </Link>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3 mt-3 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/home">
                Home
              </Link>
            </li>

            {token && (
              <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/create">
                  Create Recipe
                </Link>
              </li>
            )}

            {/* AUTH SECTION */}
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn btn-outline-light btn-sm px-3"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link fw-semibold text-warning">
                    👋 {user?.name}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm px-3"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
