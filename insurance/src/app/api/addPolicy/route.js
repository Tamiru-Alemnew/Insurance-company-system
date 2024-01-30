import { NextResponse } from "next/server";
import Policy from "../../../models/policy";
import connectDB from "../../../utils/dbConnect";

export async function POST(req, res) {
  await connectDB();
  let passedValue = await new Response(req.body).text();
  let bodyreq = JSON.parse(passedValue);
  console.log(bodyreq);
  const {
    policyId,
    InsuredProperty,
    PolicyHolder,
    PolicyStartDate,
    UserId,
    PolicyRenewal,
    TotalCost,
    NextPaymentDate,
    Premium,
  } = bodyreq;

  const policy = new Policy({
    policyId,
    InsuredProperty,
    PolicyHolder,
    PolicyStartDate,
    UserId,
    PolicyRenewal,
    TotalCost,
    NextPaymentDate,
    Premium,
  });
  await policy.save();
  return NextResponse.json(policy);
}
