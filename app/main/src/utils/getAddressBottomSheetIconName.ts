export const getAddressBottomSheetIconName = (iconName: string): string => {
  return (
    {
      casa: 'home',
      amigo: 'people',
      pareja: 'heart',
      trabajo: 'ios-briefcase',
      universidad: 'school',
    }[iconName] || 'ellipsis-horizontal'
  );
};
