export const login = (user) => {
  return { data: user };
};

export const doublecheck = ({ email }) => {
  return { data: true };
};

export const signup = (user) => {
  return { data: null };
};

export const logout = (user) => {
  return { data: null };
};

export const checkNumber = ({ number }) => {
  return { data: true };
};
