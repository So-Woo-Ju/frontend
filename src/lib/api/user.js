import axios from "axios";

export const login = (user) => {
  return axios.post("http://3.34.255.82/api/v1/auth/login", user, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};

export const mailCheck = ({ email }) => {
  return axios.post(
    "http://3.34.255.82/api/v1/auth/send-email",
    { email },
    {
      headers: {
        "Content-Type": `application/json`,
      },
    },
  );
};

export const signup = (user) => {
  return axios.post("http://3.34.255.82/api/v1/auth/signup", user, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};

export const logout = (user) => {
  return { data: null };
};

export const checkNumber = ({ email, code }) => {
  return axios.post(
    "http://3.34.255.82/api/v1/auth/verify-code",
    { email, code },
    {
      headers: {
        "Content-Type": `application/json`,
      },
    },
  );
};
