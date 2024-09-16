// plicy of a specific user with id
import Claim from "../../../models/claims";
import connectDB from "../../../utils/dbConnect";

export async function POST(req, res) {
  await connectDB();
  let passedValue = await new Response(req.body).text();
  let bodyreq = JSON.parse(passedValue);
  const { UserId } = bodyreq;
  const claims = await Claim.find({ UserId });

  if (!claims) {
    return new Response("Policy not found", { status: 404 });
  }
  return Response.json(claims);
}
