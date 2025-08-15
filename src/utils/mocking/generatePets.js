import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

const speciesList = ["dog", "cat", "hamster", "bird", "fish"];

export const generateMockPets = (count = 20) => {
  const pets = [];
  for (let i = 0; i < count; i++) {
    pets.push({
      _id: new mongoose.Types.ObjectId(),
      name: faker.person.firstName(),
      species: speciesList[Math.floor(Math.random() * speciesList.length)],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return pets;
};
