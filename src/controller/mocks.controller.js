import { MockService } from "../services/mocks.services.js";

export class MocksController {
  constructor() {
    this.service = new MockService();

    this.getMockingUsers = this.getMockingUsers.bind(this);
    this.getMockingPets = this.getMockingPets.bind(this);
    this.generateData = this.generateData.bind(this);
  }

  async getMockingUsers(req, res, next) {
    try {
      const count = Number(req.query.count ?? 50);
      if (!Number.isFinite(count) || count < 0 || count > 5000) {
        return res.status(400).json({ error: "Invalid 'count' (0..5000)" });
      }
      const users = await this.service.generateUsers(count);
      return res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async getMockingPets(req, res, next) {
    try {
      const count = Number(req.query.count ?? 20);
      if (!Number.isFinite(count) || count < 0 || count > 5000) {
        return res.status(400).json({ error: "Invalid 'count' (0..5000)" });
      }
      const pets = await this.service.generatePets(count);
      return res.json(pets);
    } catch (err) {
      next(err);
    }
  }

  async generateData(req, res, next) {
    try {
      const { users = 0, pets = 0 } = req.body ?? {};
      const u = Number(users);
      const p = Number(pets);

      if (![u, p].every(n => Number.isFinite(n) && n >= 0) || u > 5000 || p > 5000) {
        return res.status(400).json({ error: "Invalid 'users'/'pets' (0..5000)" });
      }

      const result = await this.service.seed({ users: u, pets: p });
      return res.json(result);
    } catch (err) {
      next(err);
    }
  }
}
