const dbConfig = require("../../data/db-config");
const AccountModels = require("../accounts/accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  try {
    const { name, budget } = req.body;

    if (name === undefined || budget === undefined) {
      res.status(400).json({ message: "name and budget are required" });
    } else if (name.trim().length < 3 || name.trim() > 100) {
      res
        .status(400)
        .json({ message: "name of account must be between 3 and 100" });
    } else if (typeof budget !== "number" || isNaN(budget)) {
      res.status(400).json({ message: "budget of account must be a number" });
    } else if (budget < 0 || budget > 1000000) {
      res
        .status(400)
        .json({ message: "budget of account is too large or too small" });
    }
  } catch (error) {
    next(error);
  }
  next();
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const existing = await dbConfig("accounts")
      .where("name", req.body.name.trim())
      .first();
    if (existing) {
      res.status(400).json({ message: "that name is taken" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.checkAccountId = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const { id } = req.params;
    const account = await AccountModels.getById(id);
    if (!account) {
      res.status(404).json({ message: "account not found" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
