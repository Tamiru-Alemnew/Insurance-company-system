import mongoose from "mongoose";
import claims from "../../../models/claims";
import connectDB from "../../../utils/dbConnect";
import { NextResponse } from "next/server";
export async function POST(req , res){
   await connectDB();
   let passedValue = await new Response(req.body).text();
   let bodyreq = JSON.parse(passedValue);
   const Claim = new claims({
      UserId: bodyreq.UserId,
        ClaimType: bodyreq.ClaimType,
        ClaimStatus: bodyreq.ClaimStatus,
        ClaimAmount: bodyreq.ClaimAmount,
        PolicyHolder: bodyreq.PolicyHolder,
        PaymentDate: bodyreq.PaymentDate,
        PaymentAmount: bodyreq.PaymentAmount,
        ClaimDate: bodyreq.ClaimDate,
        TransactionID: bodyreq.TransactionID,
   });
   await Claim.save();
   return NextResponse.json(Claim);
   
   }