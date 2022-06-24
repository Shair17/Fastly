import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {PersonalInformationType} from '../interfaces/appInterfaces';
import {AskPersonalInformationSchema} from '../schemas/ask-personal-information.schema';

interface Props {
  email?: string;
  phone?: string;
  dni?: string;
}

export const useEditProfile = (props?: Props) => {
  const [image, setImage] = useState<ImagePickerResponse>();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<PersonalInformationType>({
    resolver: zodResolver(AskPersonalInformationSchema),
    defaultValues: {
      dni: props?.dni,
      email: props?.email,
      phone: props?.phone,
    },
  });

  const userPickedAvatar = image !== undefined && image?.assets !== undefined;

  const handleChangeAvatar = () => {
    launchImageLibrary(
      {
        maxHeight: 500,
        maxWidth: 500,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
        quality: 0.5,
      },
      response => {
        if (response.didCancel) return;
        if (!response.assets) return;

        setImage(response);
      },
    );
  };

  const handleRemoveAvatar = () => {
    setImage(undefined);
  };

  const handleChangeAvatarInfo = () => {
    Notifier.showNotification({
      title: 'Personaliza tu avatar',
      description: 'Toca el avatar para elegir uno desde tu galería.',
      Component: NotifierComponents.Notification,
    });
  };

  const handleChangeNameInfo = () => {
    Notifier.showNotification({
      title: 'Advertencia',
      description: 'No puedes editar tu nombre.',
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'warn',
      },
    });
  };

  return {
    image,
    handleSubmit,
    control,
    errors,
    userPickedAvatar,
    handleChangeAvatar,
    handleRemoveAvatar,
    handleChangeAvatarInfo,
    handleChangeNameInfo,
  };
};
