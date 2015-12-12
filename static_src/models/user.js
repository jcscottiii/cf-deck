/*
 * @flow
 */

export type User = {
  active: boolean;
  admin: boolean;
  default_space_guid: string;
  guid: string;
  organization_roles: Array<string>;
  orgGuid: string;
  spaceGuid: string;
};
