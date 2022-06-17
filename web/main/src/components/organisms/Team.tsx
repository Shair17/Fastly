import {TeamMember} from '../molecules/TeamMember';
import {team} from 'constants/team.constants';

export const Team = () => {
  return (
    <div className="w-full my-28">
      <div className="px-1 mx-auto max-w-7xl sm:px-3 lg:px-6">
        <h2 className="text-4xl font-bold text-center">Equipo</h2>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-center text-gray-700">
          Somos un equipo de jóvenes emprendedores como tú que busca mejorar la
          situación en nuestra localidad a través de la tecnología.
        </p>
        <div className="grid grid-cols-2 my-16 gap-x-16 gap-y-8 md:grid-cols-3">
          {team.map((member, key) => (
            <TeamMember key={key.toString()} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};
