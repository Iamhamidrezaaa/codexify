import { NextResponse } from "next/server";

/** @deprecated Use NextAuth signIn via /adminha */
export async function POST() {
  return NextResponse.json(
    {
      error:
        "این مسیر منسوخ شده است. از صفحه ورود /adminha استفاده کنید.",
    },
    { status: 410 },
  );
}
