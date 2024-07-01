export const checkRole = (roles) => {
  return (request, response, next) => {
    if (!roles.includes(request.user.role)) {
      return response.status(403).json({
        message:
          'Access denied. You do not have permission to perform this action.',
      });
    }
    next();
  };
};
