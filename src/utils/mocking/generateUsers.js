import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { createHash } from "../utils.js";

export const generateMockUsers = (count = 50) => {
  const hashed = createHash("coder123");
  const users = [];

  for (let i = 0; i < count; i++) {
    const first = faker.person.firstName();
    const last  = faker.person.lastName();
    const email = faker.internet.email({ firstName: first, lastName: last }).toLowerCase();

    users.push({
      _id: new mongoose.Types.ObjectId(),
      first_name: first,
      last_name: last,
      email,
      password: hashed,
      role: Math.random() < 0.2 ? "admin" : "user",
      pets: [], // requerido por la consigna
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return users;n
};
