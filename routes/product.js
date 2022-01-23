const { Router } = require("express");
const { Product, validate } = require("../models/product");
const wrap = require("../middlewares/asyncHandler");
const validator = require("../middlewares/validator");
const validateObjectId = require("../middlewares/validateObjectId");
const handle404 = require("../middlewares/handle404");

/* express v5 will have async handler built in
at that time remove both wrap() and app.use(error) */

const router = Router();

/* get all todos */
router.get(
  "/",
  wrap(async (req, res) => {
    const product = await Product.find().sort({ _id: "desc" });
    if (!product) return handle404(res);
    return res.json(product);
  })
);

/* get a single todo */
router.get(
  "/:id",
  validateObjectId,
  wrap(async (req, res) => {
    const todo = await Product.findById(req.params.id);

    if (!todo) return handle404(res);
    res.json(todo);
  })
);

/* add new todo */
router.post(
  "/",
  validator(validate),
  wrap(async (req, res) => {
    const { title, completed } = req.body;
    const todo = new Product({ title, completed });
    const result = await todo.save();
    return res.status(201).json(result);
  })
);

/*  update existing todo */
router.put(
  "/:id",
  validateObjectId,
  validator(validate),
  wrap(async (req, res) => {
    const { title, completed } = req.body;
    const todo = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        completed,
      },
      { new: true }
    );
    if (!todo) return handle404(res);
    return res.json(todo);
  })
);

/* remove existing todo */
router.delete(
  "/:id",
  validateObjectId,
  wrap(async (req, res) => {
    const todo = await Product.findByIdAndDelete(req.params.id);

    if (!todo) return handle404(res);

    return res.json(todo);
  })
);

module.exports = router;
