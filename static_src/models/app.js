/* @flow */

export type App = {
  guid: string;
  name: string;
  detected_buildpack: string;
  memory: number;
  instances: number;
  state: string;
  disk_quota: number;
};
