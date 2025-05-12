import axios from "axios";

export const checkAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const response = await axios.get('http://localhost:8000/api/protected/', {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return true; // token is valid
  } catch (err) {
    return false; // token is invalid/expired
  }
};