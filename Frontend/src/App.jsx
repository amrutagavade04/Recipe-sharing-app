import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./Pages/Home";
import Loginpage from "./Pages/Loginpage";
import RegisterPage from "./Pages/RegisterPage";
import CreateRecipe from "./Pages/CreateRecipe";
import RecipeDetail from "./Pages/RecipeDetail";
import EditRecipe from "./Pages/EditRecipe";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
         
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* Public */}
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />

          {/* Protected */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateRecipe />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recipe/edit/:id"
            element={
              <ProtectedRoute>
                <EditRecipe />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
