import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { FoodModel } from "../models/food.model.js";
import { sample_users } from "../data.js";
import { sample_foods } from "../data.js";
import bcrypt from "bcryptjs";
const PASSWORD_HASH_SALT_ROUNDS = 10;

set("strictQuery", true);

export const dbconnect = async () => {
  try {
    await connect(process.env.MONGO_URI);
    await seedUsers();
    await seedFoods();
    console.log("Uspješno spojen---");
  } catch (error) {
    console.log("Greška prilikom spajanja:", error);
  }
};

async function seedUsers() {
  const userCount = await UserModel.countDocuments();
  if (userCount > 0) {
    console.log("Podaci o korisnicima su već sinkronizirani!");
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }
  console.log("Podaci o korisnicima su sinkronizirani sa bazom");
}

async function seedFoods() {
  const foods = await FoodModel.countDocuments();
  if (foods > 0) {
    console.log("Podaci o artiklima su već sinkronizirani!");
    return;
  }

  for (const food of sample_foods) {
    food.imageUrl = `/foods/${food.imageUrl}`;
    await FoodModel.create(food);
  }

  console.log("Podaci o artiklima su sinkronizirani sa bazom");
}
