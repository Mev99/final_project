import User from "../dao/classes/user.mongo.js";
import Products from "../dao/classes/product.mongo.js";
import UserRepository from "./user.repository.js";
import ProductRepository from "./product.repository.js";

export const productService = new ProductRepository(new Products())
export const userService = new UserRepository(new User())