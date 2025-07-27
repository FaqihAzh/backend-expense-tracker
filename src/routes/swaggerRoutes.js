import express from 'express';
import { swaggerDocument, swaggerOptions, swaggerUi } from '../config/swagger.js';

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument, swaggerOptions));

router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});

export default router;