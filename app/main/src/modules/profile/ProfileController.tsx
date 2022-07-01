import React, {FC} from 'react';
import {ProfileScreenProps} from '../../navigation/screens/app/ProfileStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen} from './screens/ProfileScreen';
import {ThemeScreen} from './screens/ThemeScreen';
import {EditProfileScreen} from './screens/EditProfileScreen';
import {SupportScreen} from './screens/SupportScreen';
import {MyAddressesScreen} from './screens/MyAddressesScreen/MyAddressesScreen';
import {MyOrdersScreen} from './screens/MyOrdersScreen';
import {ProfileStackParams} from './ProfileStackParams.type';

const ProfileStack = createNativeStackNavigator<ProfileStackParams>();

export const ProfileController: FC<ProfileScreenProps> = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}
      initialRouteName="Profile">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="MyAddresses" component={MyAddressesScreen} />
      <ProfileStack.Screen name="MyOrders" component={MyOrdersScreen} />
      <ProfileStack.Screen name="Theme" component={ThemeScreen} />
      <ProfileStack.Screen name="Support" component={SupportScreen} />
    </ProfileStack.Navigator>
  );
};
