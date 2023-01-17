  const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    console.log("--- went to login page withAuth")
    res.redirect('/login');
  } else {
    // If the user is logged in, continue
    next();
  }
  };

  module.exports = withAuth;