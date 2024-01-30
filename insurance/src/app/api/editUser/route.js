import User from "../../../models/user";
import connectDB from "../../../utils/dbConnect";

export async function PATCH(req) {
  await connectDB();
  let passedValue = await new Response(req.body).text();
  let bodyreq = JSON.parse(passedValue);
  const { UserId, Email, Phone, Address } = bodyreq;
  const updatedUser = await User.findOneAndUpdate(
    { UserId: UserId },
    { Email, Phone, Address },
    { new: true }
  );

  if (!updatedUser) {
    return new Response("Error updating", { status: 500 });
  }
  return Response.json(updatedUser);
}
