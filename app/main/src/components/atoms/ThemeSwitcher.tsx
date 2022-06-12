import React from 'react';
import {StatusBar} from 'react-native';
import {useTheme, Div, Radio, Text, Icon} from 'react-native-magnus';
import {lightTheme, darkTheme, ThemesNames} from '../../theme';
import {useMMKVString} from 'react-native-mmkv';
import {themeStorageKey} from '../../constants/theme.constants';
import {storage} from '../../storage';
import {useSystemColorScheme} from '../../hooks/useSystemColorScheme';

const ThemeOptions = [
  {
    displayName: 'Claro',
    iconName: 'sunny',
    themeName: 'light',
  },
  {
    displayName: 'Oscuro',
    iconName: 'moon',
    themeName: 'dark',
  },
  {
    displayName: 'Sistema',
    iconName: 'phone-portrait',
    themeName: 'system',
  },
];

export const ThemeSwitcher = () => {
  const {setTheme} = useTheme();
  const systemTheme = useSystemColorScheme();
  const [themeStorage, setThemeStorage] = useMMKVString(
    themeStorageKey,
    storage,
  );
  const defaultValue =
    themeStorage === ThemesNames.lightTheme
      ? 'light'
      : themeStorage === ThemesNames.darkTheme
      ? 'dark'
      : 'system';

  const onChange = (themeName: ThemesNames) => {
    if (themeName === ThemesNames.systemTheme) {
      setThemeStorage(undefined);
      setTheme(systemTheme === 'light' ? lightTheme : darkTheme);
      // StatusBar.setBarStyle(systemTheme === 'light' ? 'dark-content' : 'light-content');
      // StatusBar.setBackgroundColor(systemTheme === 'light' ? '#fff' : '#000');
    } else if (themeName === ThemesNames.lightTheme) {
      setThemeStorage(ThemesNames.lightTheme);
      setTheme(lightTheme);
      // StatusBar.setBarStyle('dark-content');
      // StatusBar.setBackgroundColor('#fff');
    } else if (themeName === ThemesNames.darkTheme) {
      setThemeStorage(ThemesNames.darkTheme);
      setTheme(darkTheme);
      // StatusBar.setBarStyle('light-content');
      //StatusBar.setBackgroundColor('#000');
    }
  };

  return (
    <Div>
      <Radio.Group
        row
        justifyContent="space-between"
        defaultValue={defaultValue}
        onChange={onChange}>
        {ThemeOptions.map(({displayName, iconName, themeName}, key) => (
          <Radio value={themeName} key={key.toString()}>
            {({checked}) => (
              <Div
                bg={checked ? 'primary' : 'red100'}
                py="md"
                px="lg"
                row
                rounded="circle">
                <Icon
                  fontFamily="Ionicons"
                  name={iconName}
                  color={checked ? 'white' : 'gray800'}
                />
                <Text
                  ml="sm"
                  color={checked ? 'white' : 'gray800'}
                  fontWeight="600">
                  {displayName}
                </Text>
              </Div>
            )}
          </Radio>
        ))}
      </Radio.Group>
    </Div>
  );
};
