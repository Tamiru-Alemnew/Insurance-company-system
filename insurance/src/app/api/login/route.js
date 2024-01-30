// login route
import User from "../../../models/user";
import connectDB from "../../../utils/dbConnect";
export async function POST(req) {
  await connectDB();
  let passedValue = await new Response(req.body).text();
  let bodyreq = JSON.parse(passedValue);

  console.log(bodyreq);

  const { UserId, password } = bodyreq;

  const user = await User.findOne({ UserId });

  if (!user) {
    return new Response( "User not found",{ status: 404 },);
  }
  if (user.password !== password) {
      return new Response( "Incorrect password",{status: 401});
  }
  const name = user.Fullname;

  return Response.json(name);
}
