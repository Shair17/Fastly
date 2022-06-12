import React from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {Div, Radio, Text, useTheme, Icon} from 'react-native-magnus';
import {useMMKVString} from 'react-native-mmkv';
import {HeaderScreen} from '../../../components/organisms/HeaderScreen';
import {themeStorageKey} from '../../../constants/theme.constants';
import {useSystemColorScheme} from '../../../hooks/useSystemColorScheme';
import {storage} from '../../../storage';
import {darkTheme, lightTheme, ThemesNames} from '../../../theme';
import {ContainerWithCredits} from '../../../components/templates/ContainerWithCredits';

const ThemeOptions = [
  {
    displayName: 'Claro',
    themeName: 'light',
  },
  {
    displayName: 'Oscuro',
    themeName: 'dark',
  },
  {
    displayName: 'Sistema',
    themeName: 'system',
  },
];

export const ThemeScreen = ({navigation}: any) => {
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
      StatusBar.setBarStyle(
        systemTheme === 'light' ? 'dark-content' : 'light-content',
      );
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
      // StatusBar.setBackgroundColor('#000');
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ContainerWithCredits>
      <HeaderScreen
        left={
          <TouchableOpacity onPress={goBack} activeOpacity={0.7}>
            <Icon
              fontFamily="Ionicons"
              name="arrow-back"
              fontSize="xl"
              color="text"
            />
          </TouchableOpacity>
        }
        middle={
          <Text fontWeight="bold" fontSize="xl">
            Tema
          </Text>
        }
      />
      <Div p="2xl">
        <Radio.Group defaultValue={defaultValue} onChange={onChange}>
          {ThemeOptions.map(({displayName, themeName}, key) => (
            <Radio
              key={key.toString()}
              value={themeName}
              prefix={
                <Text flex={1} fontWeight="500" fontSize="xl">
                  {displayName}
                </Text>
              }
              activeColor="primary"
              mb="lg">
              {null}
            </Radio>
          ))}
        </Radio.Group>
      </Div>
    </ContainerWithCredits>
  );
};
