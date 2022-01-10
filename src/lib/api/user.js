import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const login = async (user) => {
  return axios
    .post("http://3.34.255.82/api/v1/auth/login", user, {
      headers: {
        "Content-Type": `application/json`,
      },
    })
    .then((res) => {
      const refresh_token = res.data.data.refreshToken;
      cookies.set("refresh_token", refresh_token, { sameSite: "strict" });
      return { data: { data: true } };
    })
    .catch(() => {
      return { data: { data: false } };
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

export const logout = () => {
  cookies.remove("refresh_token");
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
