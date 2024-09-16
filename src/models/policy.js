import mongoose from "mongoose";

const PolicySchema = mongoose.Schema({
  policyId: { type: String, required: true },
  InsuredProperty: { type: String, required: true },
  PolicyHolder: { type: String, required: true },
  PolicyStartDate: { type: String, required: true },
  UserId: { type: String, required: true },
  PolicyRenewal: { type: String, required: true },
  TotalCost: { type: String, required: true },
  NextPaymentDate: { type: String, required: true },
  Premium: { type: String, required: true },
});
let Policy;

if (mongoose.models.Policy) {
  Policy = mongoose.model("Policy");
} else {
  Policy = mongoose.model("Policy", PolicySchema);
}

export default Policy;
