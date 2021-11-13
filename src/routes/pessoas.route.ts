import { Router } from 'express';
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.get('/', authMiddleware, function (req, res) {
  res.send('teste');
});

export default router;
