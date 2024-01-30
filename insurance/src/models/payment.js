import mongoose from "mongoose";
const Payment = mongoose.Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  PaymentId: { type: String, required: true },
  Payer: { type: String, required: true },
  PaymentAmount: { type: String, required: true },
  PaymentDate: { type: String, required: true },
  Reason: { type: String, required: true },
  //pplicy id and based on this fetch payment history
  TransactionMethod: { type: String, required: true },
  PaymentReason: { type: String, required: true },
});
export default mongoose.models.Payment || mongoose.model("Payment", Payment);
