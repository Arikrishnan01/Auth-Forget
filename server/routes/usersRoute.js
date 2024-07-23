import express from "express";
import { usersSignIn, usersSignUp } from "../controllers/usersController.js";

const router = express.Router();

router.post("/signUp", usersSignUp);
router.post("/signIn", usersSignIn);

const usersRoutes = router;
export default usersRoutes;