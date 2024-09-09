import { Id } from "./global";
import { Part } from "./part";

export type GetRolesQ = Role[];

export type Role = {
  parts: Part[];
  name: string;
  id: Id;
};

export type RoleCardProps = Role;

export type AddRoleInputs = {
  name: string;
};

export type AddRoleF = AddRoleInputs & {
  part_ids: Id[];
};

export type UpdateRoleF = AddRoleInputs & {
  part_ids: Id[];
};

export type AddRoleQ = Role;

export type UpdateRoleQ = Role;

export type DeleteRoleQ = Id;
