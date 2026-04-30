type Role = keyof typeof ROLE_PERMISSIONS;

type User = {
  role: Role;
};

export const ROLE_PERMISSIONS: {
  main_admin: string[];
  single_admin: string[];
  superuser: string[];
  technician: string[];
  subed_club: string[];
  free_club: string[];
} = {
  main_admin: ["create:post", "delete:post", "view:premium"],
  single_admin: ["create:post"],
  superuser: [],
  technician: [],
  subed_club: [],
  free_club: [],
};

export const hasPermission = (user: User, permission: string) => {
  return ROLE_PERMISSIONS[user.role]?.includes(permission);
};

export const hasTierAccess = (user: any, tiers: string[]) => {
  return tiers.includes(user.tier);
};
