import { NextRequest, NextResponse } from "next/server";
import getMongoClient from "@/lib/mongodb";

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  weddingDate?: string;
  celebrationType?: string;
  message?: string;
};

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.email === "string" &&
    b.email.trim().length > 0
  );
}

export async function GET() {
  try {
    const client = await getMongoClient();
    const db = client.db("NISHA's");

    const leads = await db
      .collection("leads")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ leads }, { status: 200 });
  } catch (err) {
    console.error("Failed to fetch leads", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "name, phone and email are required" },
      { status: 400 },
    );
  }

  try {
    const client = await getMongoClient();
    const db = client.db("NISHA's");

    await db.collection("leads").insertOne({
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email.trim(),
      weddingDate: body.weddingDate?.trim() || null,
      celebrationType: body.celebrationType?.trim() || null,
      message: body.message?.trim() || null,
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Failed to save lead", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
