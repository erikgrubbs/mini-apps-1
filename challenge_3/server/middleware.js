const loggedIn = (req, res, next) => {
    if (req.cookies.success === 'yes') {
      req.loggedIn = true;
      next();
    }
  req.loggedIn = false;
  next();
}

module.exports = loggedIn;