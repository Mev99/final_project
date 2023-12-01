import User from "../dao/classes/user.mongo.js";
import Products from "../dao/classes/product.mongo.js";
import RestorePass from "../dao/classes/restorePass.mongo.js";

import UserRepository from "./user.repository.js";
import ProductRepository from "./product.repository.js";
import RestorePassRepository from "./restorePass.repository.js";

export const productService = new ProductRepository(new Products())
export const userService = new UserRepository(new User())
export const restorePassService = new RestorePassRepository(new RestorePass())