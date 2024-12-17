import { Router } from 'express';
import { bankWebhook } from '../controllers/bankWebook.controller';

const router = Router();

router.route('/webhook').post(bankWebhook);

export default router;