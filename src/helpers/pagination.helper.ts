export const pagination = (page = 1, limit = 10) => {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);

  return {
    skip: (safePage - 1) * safeLimit,
    take: safeLimit,
  };
};