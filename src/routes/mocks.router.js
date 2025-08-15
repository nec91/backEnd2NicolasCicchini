import { Router } from "express";
import { MocksController } from "../controller/mocks.controller.js";

const mocksRouter = Router();
const controller = new MocksController();

// GET /api/mocks/mockingusers?count=50  (solo genera y devuelve, no inserta)
mocksRouter.get("/mockingusers", controller.getMockingUsers);

// GET (solo genera y devuelve, no inserta)
mocksRouter.get("/mockingpets", controller.getMockingPets);

// POST  { users: número, pets: número }  (genera e inserta)
mocksRouter.post("/generateData", controller.generateData);

export {mocksRouter}