export const paginateProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, query, sort } = req.query;

    const searchQuery = query
      ? { title: { $regex: query, $options: "i" } }
      : {};


    const options = {
      page: Number(page),
      limit: Number(limit),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
    };

    res.paginatedResults = { query: searchQuery, options };
    next();
  } catch (error) {
    res.status(400).json({ status: "error", message: `Error en la paginación: ${error.message}` });
  }
};
