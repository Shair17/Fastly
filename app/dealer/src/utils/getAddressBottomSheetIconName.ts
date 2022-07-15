export const getAddressBottomSheetIconName = (iconName: string): string => {
  return (
    {
      CASA: 'home',
      AMIGO: 'people',
      PAREJA: 'heart',
      TRABAJO: 'ios-briefcase',
      UNIVERSIDAD: 'school',
    }[iconName] || 'ellipsis-horizontal'
  );
};
