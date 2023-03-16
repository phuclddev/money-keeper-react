import request from "../lib/request";
import axios from "axios";

export const getUser = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/user/detail/', {
      credentials: 'include'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAccounts = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/account', { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAccount = async (accountId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/account/${accountId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};