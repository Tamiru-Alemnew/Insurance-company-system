//to desplay the name 
import User from "../../../models/user";
import connectDB from "../../../utils/dbConnect";

export async function POST(req) {
    await connectDB();
    let passedValue = await new Response(req.body).text();
    let bodyreq = JSON.parse(passedValue);
    const { UserId } = bodyreq;
    const user = await User.find({ UserId });

    if (!user) {
        return new Response("User not found", { status: 404 });
    }
    return Response.json(user);
}
