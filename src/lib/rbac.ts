import type { Role } from "@/types";

const ROLE_LEVEL: Record<Role, number> = {
  VISITOR: 0,
  MEMBER: 1,
  ADMIN: 2,
};

export function hasRole(currentRole: Role, requiredRole: Role) {
  return ROLE_LEVEL[currentRole] >= ROLE_LEVEL[requiredRole];
}

export function canAccess(currentRole: Role, allowedRoles: Role[]) {
  return allowedRoles.some((role) => hasRole(currentRole, role));
}
