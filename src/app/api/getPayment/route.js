// plicy of a specific user with id
import Payment from "../../../models/payment";
import connectDB from "../../../utils/dbConnect";

export async function POST(req, res) {
  await connectDB();
  let passedValue = await new Response(req.body).text();
  let bodyreq = JSON.parse(passedValue);
  const { UserId } = bodyreq;
  const payments = await Payment.find({ UserId });

  if (!payments) {
    return new Response("Payment not found", { status: 404 });
  }
  return Response.json(payments);
}
