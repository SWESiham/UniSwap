export const paginate = (page = 1, limit = 20) => ({
  skip: (Number(page) - 1) * limit,
  limit,
});
