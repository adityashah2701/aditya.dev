import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Here you would typically integrate with an email service or database
    console.log("Received contact form submission:", data);

    return NextResponse.json(
      { success: true, message: "Transmission received." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Transmission failed." ,error},
      { status: 500 },
    );
  }
}
