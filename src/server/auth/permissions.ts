import { AdminRole } from "@prisma/client";

export type Permission =
  | "admins:read"
  | "admins:write"
  | "admins:delete"
  | "messages:read"
  | "messages:write"
  | "messages:delete"
  | "analytics:read"
  | "settings:read"
  | "settings:write"
  | "audit:read";

const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  SUPER_ADMIN: [
    "admins:read",
    "admins:write",
    "admins:delete",
    "messages:read",
    "messages:write",
    "messages:delete",
    "analytics:read",
    "settings:read",
    "settings:write",
    "audit:read",
  ],
  ADMIN: [
    "admins:read",
    "messages:read",
    "messages:write",
    "messages:delete",
    "analytics:read",
    "settings:read",
    "audit:read",
  ],
};

export function permissionsFor(role: AdminRole): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function can(role: AdminRole, permission: Permission) {
  return permissionsFor(role).includes(permission);
}
