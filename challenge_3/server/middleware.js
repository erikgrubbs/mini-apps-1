const loggedIn = (req, res, next) => {
  if (req.cookies) {
    req.loggedIn = true;
    next();
  } else {
    req.loggedIn = false;
    next();
  }
}

module.exports = loggedIn;