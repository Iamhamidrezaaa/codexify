import { NextResponse } from "next/server";
import { forgotPasswordSchema, resetPasswordSchema } from "@/server/validators";
import { rateLimit } from "@/server/security/rateLimit";
import { getRequestContext } from "@/server/security/requestContext";
import {
  requestPasswordReset,
  resetPasswordWithToken,
} from "@/server/services/passwordResetService";
import { ServiceError } from "@/server/services/adminService";

export async function POST(request: Request) {
  try {
    const ctx = await getRequestContext();
    const limited = rateLimit(`forgot:${ctx.ipHash}`, 5, 15 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "تعداد درخواست‌ها زیاد است." },
        { status: 429 },
      );
    }

    const body = await request.json();
    if (body.token) {
      const parsed = resetPasswordSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message || "Invalid" },
          { status: 400 },
        );
      }
      await resetPasswordWithToken(
        parsed.data.token,
        parsed.data.password,
        ctx.ip,
      );
      return NextResponse.json({ ok: true });
    }

    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid" },
        { status: 400 },
      );
    }
    await requestPasswordReset(parsed.data.email, ctx.ip);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof ServiceError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    console.error("[password-reset]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
