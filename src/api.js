import axios from "axios";

const baseUrl = "https://press-jl.herokuapp.com/api";

const fetchArticles = queries => {
  return axios.get(`${baseUrl}/articles/`, {
    params: queries
  });
};

const fetchArticleById = article_id => {
  return axios.get(`${baseUrl}/articles/${article_id}`);
};

const postArticle = article => {
  return axios.post(`${baseUrl}/articles`, article);
};

const deleteArticleById = id => {
  return axios.delete(`${baseUrl}/articles/${id}/`);
};

const fetchCommentsByArticleId = (article_id, p) => {
  return axios.get(`${baseUrl}/articles/${article_id}/comments`, { params: p });
};

const fetchTopics = () => {
  return axios.get(`${baseUrl}/topics`);
};

const patchVote = (type, id, num) => {
  return axios.patch(`${baseUrl}/${type}/${id}`, { inc_votes: num });
};

const postComment = (id, comment) => {
  return axios.post(`${baseUrl}/articles/${id}/comments/`, comment);
};

const deleteComment = id => {
  return axios.delete(`${baseUrl}/comments/${id}/`);
};

export {
  fetchArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  fetchTopics,
  patchVote,
  postComment,
  deleteComment,
  postArticle,
  deleteArticleById
};
