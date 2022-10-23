import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackProps} from '@fastly/navigation/stacks/home';
import {HomeScreen} from './screens/HomeScreen';
import {CategoriesScreen} from './screens/CategoriesScreen';
import {CategoryScreen} from './screens/CategoryScreen';
import {ProductScreen} from './screens/ProductScreen';
import {StoreScreen} from './screens/StoreScreen';
import {StoreCategory} from '@fastly/interfaces/app';

// ? Todas las categorías: categories screen
// ? Una sola categoría: category screen
// ? product Screen
// ? store screen
// ? stores screen
// TODO: agregar pantalla de *SERVICIO* para la siguiente versión
export type HomeStackParamList = {
  Home: undefined;
  Categories: undefined;
  Category: {
    category: StoreCategory;
  };
  Product: {
    id: string;
  };
  Store: {
    id: string;
  };
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export const HomeController: React.FC<HomeStackProps> = ({navigation}) => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Categories" component={CategoriesScreen} />
      <HomeStack.Screen name="Category" component={CategoryScreen} />
      <HomeStack.Screen name="Product" component={ProductScreen} />
      <HomeStack.Screen name="Store" component={StoreScreen} />
      {/** Agregar pantalla de *TODO LO QUE QUIERAS* para la siguiente versión */}
      {/** Agregar pantalla de *ENCARGOS* para la siguiente versión */}
    </HomeStack.Navigator>
  );
};
