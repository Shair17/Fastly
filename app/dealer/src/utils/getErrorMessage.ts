const FALLBACK_MESSAGE = 'Ha ocurrido un error inesperado.';

export const getForgotPasswordErrorMessage = (message: string) => {
  return (
    {
      account_not_found: 'Prueba con otros datos.',
    }[message] ||
    message ||
    FALLBACK_MESSAGE
  );
};

export const getLoginErrorMessage = (message: string) => {
  return (
    {
      invalid_credentials: 'Correo electrónico y/o contraseña incorrectos.',
      banned: 'Has sido baneado de Fastly.',
      inactive_account:
        'Tu cuenta está inactiva, pronto el equipo de Fastly activará tu cuenta.',
    }[message] ||
    message ||
    FALLBACK_MESSAGE
  );
};

export const getRegisterErrorMessage = (message: string) => {
  return (
    {
      service_disabled:
        'El servicio de registro ha sido desactivado indefinidamente.',
      account_taken: 'Prueba con otros datos por favor.',
    }[message] ||
    message ||
    FALLBACK_MESSAGE
  );
};
