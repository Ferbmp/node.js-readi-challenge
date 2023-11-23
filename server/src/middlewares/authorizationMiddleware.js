export const authorize = (...permittedProfiles) => {
  return (req, res, next) => {
    if (req.user && permittedProfiles.includes(req.user.profile)) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "Acesso não permitido para este perfil." });
    }
  };
};
