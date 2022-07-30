import React from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {ApplicationParams} from '@fastly/navigation/drawer/Root';
import {SettingsController} from '@fastly/modules/settings/SettingsController';

export interface SettingsStackProps
  extends DrawerScreenProps<ApplicationParams, 'SettingsStack'> {}

export const SettingsStack: React.FC<SettingsStackProps> = props => {
  return <SettingsController {...props} />;
};
