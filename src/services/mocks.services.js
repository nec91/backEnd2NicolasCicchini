import { generateMockUsers } from "../utils/mocking/generateUsers.js";
import { generateMockPets } from "../utils/mocking/generatePets.js";
import { UsersRepository } from "../repositories/DAO_MONGO/users.repository.dao.js";
import { PetRepository } from "../repositories/DAO_MONGO/pet.repository.dao.js";

export class MockService {
  constructor() {
    this.userRepo = new UsersRepository();
    this.petRepo = new PetRepository();
  }

  // Para GET que solo devuelve
  async generateUsers(count) {
    return generateMockUsers(count);
  }

  // Para GET que solo devuelve
  async generatePets(count) {
    return generateMockPets(count);
  }

  // Para POST que inserta en DB
  async seed({ users = 0, pets = 0 }) {
    const mockUsers = users > 0 ? generateMockUsers(users) : [];
    const mockPets  = pets  > 0 ? generateMockPets(pets)   : [];

    const inserted = { users: 0, pets: 0, userIds: [], petIds: [] };

    if (mockUsers.length) {
      const resUsers = await this.userRepo.insertMany(mockUsers);
      inserted.users = resUsers.length ?? 0;
      inserted.userIds = resUsers.map(u => u._id);
    }

    if (mockPets.length) {
      const resPets = await this.petRepo.insertMany(mockPets);
      inserted.pets = resPets.length ?? 0;
      inserted.petIds = resPets.map(p => p._id);
    }

    return inserted;
  }
}
