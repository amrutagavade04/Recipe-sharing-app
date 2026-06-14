import axiosInstance from "./axiosInstance";

export const createRecipe = (formData, token) => {
  return axiosInstance.post("/recipes", formData, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ ONLY THIS
    },
  });
};

export const getAllRecipes = () => {
  return axiosInstance.get("/recipes");
};

export const getRecipeById = (id) => {
  return axiosInstance.get(`/recipes/${id}`);
};

export const updateRecipe = (id, formData, token) => {
  return axiosInstance.put(`/recipes/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const likeRecipe = (id, token) => {
  return axiosInstance.post(
    `/recipes/${id}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ MUST be Bearer
      },
    }
  );
};



export const deleteRecipe = (id, token) => {
  return axiosInstance.delete(`/recipes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

