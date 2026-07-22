import assert from "node:assert/strict";
import {
  adminCreateSchema,
  contactSchema,
  forgotPasswordSchema,
} from "./index";
import { validatePasswordPolicy } from "../../lib/crypto";

assert.equal(
  validatePasswordPolicy("weak"),
  "رمز باید حداقل ۱۰ کاراکتر و شامل حرف بزرگ، کوچک، عدد و نماد باشد.",
);
assert.equal(validatePasswordPolicy("Hamidreza123@456"), null);

assert.equal(
  adminCreateSchema.safeParse({
    fullName: "A",
    email: "bad",
    password: "short",
    confirmPassword: "short",
  }).success,
  false,
);

assert.equal(
  contactSchema.safeParse({
    name: "Ali",
    phone: "09121234567",
    projectDescription: "Need a website",
  }).success,
  true,
);

assert.equal(
  forgotPasswordSchema.safeParse({ email: "admin@codexify.ir" }).success,
  true,
);

console.log("validators.test.ts: ok");
