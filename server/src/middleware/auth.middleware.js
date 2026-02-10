function isAuthenticated(req, res, next){
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  res.status(401);
  return next(new Error("UNAUTHORIZED"));
};

export default isAuthenticated;