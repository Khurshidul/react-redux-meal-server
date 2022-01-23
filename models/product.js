const { model, Schema } = require("mongoose");
const Joi = require("joi");

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    numberInStock: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const validate = function (data) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).required(),
    image: Joi.string().min(3).max(1000).required(),
    numberInStock: Joi.number(),
    price: Joi.number(),
  });
  return schema.validate(data);
};

module.exports.validate = validate;
module.exports.Product = model("Product", ProductSchema);
