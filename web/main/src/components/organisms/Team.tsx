import {TeamMember} from '../molecules/TeamMember';
import {team} from 'constants/team.constants';

export const Team = () => {
  return (
    <div className="my-28 w-full">
      <div className="mx-auto max-w-7xl px-1 sm:px-3 lg:px-6">
        <h2 className="text-center text-4xl font-bold">Equipo</h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-700">
          Somos un equipo de jóvenes emprendedores como tú que busca mejorar la
          situación en nuestra localidad a través de la tecnología.
        </p>
        <div className="my-16 grid grid-cols-2 gap-x-16 gap-y-8 md:grid-cols-3">
          {team.map((member, key) => (
            <TeamMember key={key.toString()} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};
