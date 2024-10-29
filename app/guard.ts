type ProtectArgs = {};
type GuardArgs = {
  user: { role: "" };
  roles: string[];
};

export function protect({}: ProtectArgs) {}

export function guard({ user, roles }: GuardArgs) {
  if (!roles.includes(user.role)) {
    throw new Error("You are not authorized");
  }

  return user;
}
