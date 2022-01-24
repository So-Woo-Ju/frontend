import Cookies from "universal-cookie";
import client from "./client";

const cookies = new Cookies();

interface UserType {
  email: string;
  password: string;
}

export const login = async (user: UserType) => {
  return client({
    url: "/auth/login",
    method: "post",
    data: user,
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
      return { login: true, tokenExp: token_exp };
    })
    .catch(() => {
      return { login: false };
    });
};

export const kakaoLogin = (token: string) => {
  return client({
    url: "/auth/kakao",
    method: "post",
    data: { kakaoToken: token },
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
      return { login: true, tokenExp: token_exp };
    })
    .catch(() => {
      return { login: false };
    });
};

export const googleLogin = (token: string) => {
  return client({
    url: "/auth/google",
    method: "post",
    data: { googleToken: token },
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
      return { login: true, tokenExp: token_exp };
    })
    .catch(() => {
      return { login: false };
    });
};

export const mailCheck = (email: string) => {
  return client({
    url: "/auth/send-email",
    method: "post",
    data: { email },
  })
    .then(() => {
      return true;
    })
    .catch((err) => {
      if (err.message.includes("400")) {
        return false;
      }
      return null;
    });
};

export const signup = (user: UserType) => {
  return client({
    url: "/auth/signup",
    method: "post",
    data: user,
  }).catch(() => {
    return false;
  });
};

export const logout = () => {
  cookies.remove("access_token");
  cookies.remove("refresh_token");
  return false;
};

export const checkNumber = ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  return client({
    url: "/auth/verify-code",
    method: "post",
    data: { email, code },
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export const getAccessToken = (tokenExp: string) => {
  if (!cookies.get("access_token")) {
    const now = new Date();
    const two_weeks_later = new Date(now.setDate(now.getDate() + 14));
    if (tokenExp < new Date(two_weeks_later).toISOString().split(".")[0]) {
      let token_exp;
      client({
        url: "/auth/refresh-token",
        method: "post",
      }).then((res) => {
        const refresh_token = res.data.data.refreshToken;
        const access_token = res.data.data.accessToken;
        token_exp = res.data.data.tokenExp;
        cookies.set("access_token", access_token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 60 * 15),
        });
        cookies.set("refresh_token", refresh_token, {
          path: "/",
          expires: new Date(token_exp),
        });
      });
      return { message: "refresh token renewal", data: token_exp };
    } else if (!cookies.get("refresh_token")) {
      return { message: "refresh token expires" };
    } else {
      client({
        url: "/auth/access-token",
        method: "post",
      }).then((res) => {
        cookies.set("access_token", res.data.data.accessToken, {
          expires: new Date(Date.now() + 1000 * 60 * 15),
        });
        return { message: "access token" };
      });
    }
  }
  return { message: "none" };
};
