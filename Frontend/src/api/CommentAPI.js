import axiosInstance from "./axiosInstance";

export const addComment = (recipeId, data, token) => {
  return axiosInstance.post(`/comments/${recipeId}`, data, {
    headers: { Authorization: token },
  });
};

export const getComments = (recipeId) => {
  return axiosInstance.get(`/comments/${recipeId}`);
};
