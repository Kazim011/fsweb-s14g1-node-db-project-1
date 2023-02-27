const router = require("express").Router();
const MDW = require("./accounts-middleware");
const AccountModels = require("./accounts-model");

router.get("/", async (req, res, next) => {
  // KODLAR BURAYA22
  try {
    const account = await AccountModels.getAll();
    res.json(account);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", MDW.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const { id } = req.params;
    const accountsId = await AccountModels.getById(id);
    res.json(accountsId);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  MDW.checkAccountPayload,
  MDW.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      const { name, budget } = req.body;
      const newAccount = await AccountModels.create({
        name: name.trim(),
        budget: budget,
      });
      res.status(201).json(newAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  MDW.checkAccountId,
  MDW.checkAccountPayload,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      const { id } = req.params;
      const updateAccount = await AccountModels.updateById(id, req.body);
      res.status(200).json(updateAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", MDW.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const { id } = req.params;
    const deleteAccount = await AccountModels.deleteById(id);
    res.status(200).json(deleteAccount);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
  res
    .status(err.status || 500)
    .json({ CustomMessage: "Hata Oluştu..", message: err.message });
});

module.exports = router;
