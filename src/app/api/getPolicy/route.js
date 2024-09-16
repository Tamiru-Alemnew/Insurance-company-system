// plicy of a specific user with id
import Policy from "../../../models/policy";
import connectDB from "../../../utils/dbConnect";

export async function POST(req, res) {
  await connectDB();
  let passedValue = await new Response(req.body).text();
  let bodyreq = JSON.parse(passedValue);
  const { UserId } = bodyreq;
  const policy = await Policy.find({ UserId });

  if (!policy) {
    return new Response("Policy not found", { status: 404 });
  }
  return Response.json(policy);
}
