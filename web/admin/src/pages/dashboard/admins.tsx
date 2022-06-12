import useAxios from 'axios-hooks';
import { DashboardLayout } from '../../components/templates/DashboardLayout';
import { MainAccount } from '../../components/organisms/MainAccount';
import { UsersTable } from '../../components/organisms/UsersTable';
import { Admin } from '../../interfaces/appInterfaces';
import { UserTableItem } from '../../components/organisms/UserTableItem';

export const DashboardAdmins = () => {
	const [{ data, loading, error }] = useAxios<Admin[]>('/admins');

	if (error) {
		console.log(error);

		return <p>Error</p>;
	}

	return (
		<DashboardLayout>
			<MainAccount
				title="Administradores 🛡️"
				description="Aquí podrás ver la lista de administradores en Fastly"
			>
				<UsersTable>
					{loading && <p>Cargando...</p>}
					{data &&
						data.map((admin) => <UserTableItem key={admin.id} {...admin} />)}
				</UsersTable>
			</MainAccount>
		</DashboardLayout>
	);
};
