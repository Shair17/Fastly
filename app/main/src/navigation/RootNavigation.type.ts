export type RootStackParams = {
  /**
   * Unauthenticated
   */

  OnBoardingScreen: undefined;
  AuthenticationScreen: undefined;

  /**
   * Authenticated
   */

  // Geolocation Permissions and loading permissions
  LoadingScreen: undefined;
  GeolocationPermissionsScreen: undefined;

  // Welcome new users
  WelcomeNewUserScreen: undefined;
  // Ask for personal info only for new users
  AskPersonalInformationScreen: undefined;
  // Ask for first address only for new users
  AskLocationScreen: {
    avatar?: string;
    email: string;
    phone: string;
    dni: string;
  };

  // Fastly App
  ApplicationBottomTab: undefined;
};
