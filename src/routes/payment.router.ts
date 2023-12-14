import { Router } from "express"; 
import paymentController from "../controllers/payment.controller";
const router = Router() 
router.post('/', paymentController.AddPayment)
router.get('/', paymentController.GetAllPayment)
router.get('/:id', paymentController.GetPaymentById)
router.put('/:id', paymentController.UpdatePayment )
router.delete('/:id', paymentController.DeletePayment)
export default {router};