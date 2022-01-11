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
      const access_token = res.data.data.accessToken;
      console.log(new Date(Date.now()));
      cookies.set("access_token", access_token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 15),
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${refresh_token}`;
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
  cookies.remove("access_token");
  return { data: { data: false } };
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

export const getAccessToken = () => {
  if (cookies.get("access_token")) {
    axios
      .post("http://3.34.255.82/api/v1/auth/access-token", {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        cookies.set("access_token", res.data.data.accessToken, {
          expires: new Date(Date.now() + 1000 * 60 * 15),
        });
      });
  }
};
