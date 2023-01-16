  const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/api/users/login');
  } else {
    // If the user is logged in, continue
    next();
  }
  console.log("--- went to login page withAuth")
  };

  module.exports = withAuth;