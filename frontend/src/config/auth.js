const isAuthenticated = () => {
  const userToken = localStorage.getItem('userToken');

  if (userToken) {
    return true;
  }

  return false;
};

export default isAuthenticated;
