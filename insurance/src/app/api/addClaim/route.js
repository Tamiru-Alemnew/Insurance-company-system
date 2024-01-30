import mongoose from "mongoose";
import claims from "../../../models/claims";
import connectDB from "../../../utils/dbConnect";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  await connectDB();
  let passedValue = await new Response(req.body).text();
  let bodyreq = JSON.parse(passedValue);
  const Claim = new claims({
    UserId: bodyreq.UserId,
    ClaimType: bodyreq.ClaimType,
    ClaimStatus: "Pending",
    ClaimAmount: "2700",
    PolicyHolder: bodyreq.PolicyHolder,
    PaymentDate: "On Hold",
    PaymentAmount: "On Hold",
    ClaimDate: bodyreq.ClaimDate,
    TransactionID: bodyreq.TransactionID,
  });
  await Claim.save();
  return NextResponse.json(Claim);
}
