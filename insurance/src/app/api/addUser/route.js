import { NextResponse } from "next/server";
import user from "../../../models/user";
import connectDB from "../../../utils/dbConnect";

export async function POST(req, res) {
  await connectDB();
  let passedValue = await new Response(req.body).text();
  let bodyreq = JSON.parse(passedValue);
  console.log(bodyreq);
  const { Fullname, Email, Phone, Address, Gender, Occupation } = bodyreq;
  console.log(Fullname);
  console.log(user);

  //user id and default password

  const person = new user({
    UserId: "123456789",
    password: "123456789",
    Fullname,
    Email,
    Phone,
    Address,
    Gender,
    Occupation,
  });
  await person.save();
  return NextResponse.json(person);
}
