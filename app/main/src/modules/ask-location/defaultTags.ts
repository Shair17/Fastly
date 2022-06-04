export type TagType =
  | 'casa'
  | 'amigo'
  | 'pareja'
  | 'trabajo'
  | 'universidad'
  | 'otro';

export const defaultTags = [
  {
    icon: 'home',
    iconFontFamily: 'Ionicons',
    name: 'Casa',
    id: 'casa',
  },
  {
    icon: 'people',
    iconFontFamily: 'Ionicons',
    name: 'Amig@',
    id: 'amigo',
  },
  {
    icon: 'heart',
    iconFontFamily: 'Ionicons',
    name: 'Pareja',
    id: 'pareja',
  },
  {
    icon: 'ios-briefcase',
    iconFontFamily: 'Ionicons',
    name: 'Trabajo',
    id: 'trabajo',
  },
  {
    icon: 'school',
    iconFontFamily: 'Ionicons',
    name: 'Universidad',
    id: 'universidad',
  },
  {
    icon: 'ellipsis-horizontal',
    iconFontFamily: 'Ionicons',
    name: 'Otro',
    id: 'otro',
  },
];
