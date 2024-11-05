import { Router } from "express";

import { CreateUserController } from "./controller/CreateUserController";
import { AuthUserController } from "./controller/AuthUserController";

const router = Router();

router.post("/cadastro", new CreateUserController().handle)

router.post("/login", new AuthUserController().handle)

export { router };