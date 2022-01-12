import Cookies from "universal-cookie";
import axios from "axios";

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
      const token_exp = res.data.data.tokenExp;
      cookies.set("access_token", access_token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 15),
      });
      cookies.set("refresh_token", refresh_token, {
        path: "/",
        expires: new Date(token_exp),
      });
      return {
        data: { data: { login: true, tokenExp: token_exp } },
      };
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
  cookies.remove("refresh_token");
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

export const getAccessToken = ({ login, tokenExp }) => {
  if (login && !cookies.get("access_token")) {
    const now = new Date();
    const two_weeks_later = new Date(now.setDate(now.getDate() + 14));
    if (tokenExp < new Date(two_weeks_later).toISOString().split(".")[0]) {
      axios
        .post("http://3.34.255.82/api/v1/auth/refresh-token", {
          headers: {
            "Content-Type": `application/json`,
          },
        })
        .then((res) => {
          const refresh_token = res.data.data.refreshToken;
          const access_token = res.data.data.accessToken;
          const token_exp = res.data.data.tokenExp;
          cookies.set("access_token", access_token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 15),
          });
          cookies.set("refresh_token", refresh_token, {
            path: "/",
            expires: new Date(token_exp),
          });
        });
    } else if (!cookies.get("refresh_token")) {
      return "refresh token expires";
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.get(
        "refresh_token",
      )}`;
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
  }
};
