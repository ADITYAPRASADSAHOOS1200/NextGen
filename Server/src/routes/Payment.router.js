import { Router } from 'express';
import {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayments,
} from '../Controllers/Payment.controller.js';

import { Authorisaton,authorisedRoles} from '../Middeware/Authorisation.js';

const router = Router();

router.route('/subscribe').post(Authorisaton, buySubscription);
router.route('/verify').post(Authorisaton, verifySubscription);
router
  .route('/unsubscribe')
  .post(Authorisaton, cancelSubscription);
router.route('/razorpay-key').get(Authorisaton, getRazorpayApiKey);
router.route('/').get(Authorisaton, authorisedRoles('ADMIN'), allPayments);

export default router;