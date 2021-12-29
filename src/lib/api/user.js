export const login = (user) => {
  return { data: user };
};

export const doublecheck = ({ email }) => {
  return { data: false };
};

export const signup = (user) => {
  return { data: user };
};

export const logout = (user) => {
  return { data: null };
};
