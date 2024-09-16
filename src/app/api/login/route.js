// login route
import User from "../../../models/user";
import connectDB from "../../../utils/dbConnect";
export async function POST(req) {
  await connectDB();
  let passedValue = await new Response(req.body).text();
  let bodyreq = JSON.parse(passedValue);

  const { UserId, password } = bodyreq;
 
  const user = await User.findOne({ UserId });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }
  if ("12345678" !== password) {
    return new Response("Invalid Credential ", { status: 401 });
  }
  const data = { name: user.Fullname, UserId: user.UserId };

  return Response.json(data);
}
