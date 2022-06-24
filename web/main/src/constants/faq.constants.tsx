import Link from 'next/link';

export const faq = [
  {
    question: '¿Fastly es gratis?',
    reply: `Sí, Fastly es gratis para todos los usuarios de la aplicación hoy y siempre.`,
  },
  {
    question: '¿Fastly es seguro?',
    reply:
      'Por supuesto, Fastly es seguro, tus datos nunca serán compartidos con nadie. Debido a esto, no hay ningún tipo de riesgo para ti, ya que solo necesitas una cuenta de Facebook para iniciar sesión con presionar un solo botón.',
  },
  {
    question: '¿Qué datos debo proporcionar para usar Fastly?',
    reply: `Los únicos datos que necesitas para usar Fastly son tus nombres y apellidos, tu correo electrónico, tu número de teléfono, tu número de DNI, tu ubicación y tu foto de perfil, no todos los datos son necesarios. (Algunos datos, como tus nombres y apellidos, foto de perfil y ubicación son obtenidos de forma automática en la aplicación).`,
  },
  {
    question: '¿Por qué pedimos estos datos?',
    reply:
      'Porque es importante que tu información sea correcta, ya que si no es correcta, no podremos proporcionarte una experiencia de usuario segura.',
  },
  {
    question: '¿Cómo funciona el delivery?',
    reply:
      'En el momento que haces un pedido, un repartidor autorizado de Fastly llegará a tu domicilio y te entregará tu pedido, luego cancelas en efectivo o yape.',
  },
  {
    question: '¿Fastly está disponible 24/7?',
    reply:
      'Siempre y cuando haya negocios y repartidores disponibles, Fastly estará para servirte. Por nuestro lado mantenemos nuestra aplicación y servidores disponibles 24/7.',
  },
  {
    question: 'Tengo un negocio, ¿Puede mi negocio estar en Fastly?',
    reply: (
      <>
        {`Por supuesto que sí, si tienes un negocio donde ofreces productos o servicios puedes `}
        <Link href="/customer" passHref title="Registrar mi negocio en Fastly">
          <a
            className="text-primary-500"
            title="Registrar mi negocio en Fastly">
            registrar tu negocio en Fastly
          </a>
        </Link>
        {`.`}
      </>
    ),
  },
  {
    question:
      'Quiero ser un repartidor autorizado de Fastly, ¿Cómo puedo ser uno?',
    reply: (
      <>
        {`Para ser un repartidor autorizado de Fastly solo necesitas tener las ganas de ser uno! Si estás interesado, puedes `}
        <Link
          href="/dealer"
          passHref
          title="Registrarme como repartidor en Fastly">
          <a
            className="text-primary-500"
            title="Registrarme como repartidor en Fastly">
            registrarte como repartidor en Fastly
          </a>
        </Link>
        {`, una vez que hayamos aprobado tu solicitud, podrás empezar a hacer delivery.`}
      </>
    ),
  },
];
