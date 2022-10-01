import { DashboardLayout } from '../../components/templates/DashboardLayout';
import { MainAccount } from '../../components/organisms/MainAccount';
import { UsersTable } from '../../components/organisms/UsersTable';
import useAxios from 'axios-hooks';
import { User } from '../../interfaces/appInterfaces';
import { UserTableItem } from '../../components/organisms/UserTableItem';

export const DashboardUsers = () => {
	const [{ error, loading, data: users, response }, refetchUsers] =
		useAxios<User[]>('/users');

	const handleRefresh = () => {
		refetchUsers();
	};

	const body = () => {
		if (loading) return <p>Cargando...</p>;

		if (error || !users) {
			console.error(error);
			return <p>Error!</p>;
		}

		if (users.length === 0) {
			return <p>No hay datos.</p>;
		}

		return (
			<UsersTable type="users">
				{users.map((user) => (
					<UserTableItem
						key={user.id}
						type="user"
						refetch={refetchUsers}
						{...user}
					/>
				))}
			</UsersTable>
		);
	};

	return (
		<DashboardLayout>
			<MainAccount
				title="Usuarios 📱"
				description="Aquí podrás ver la lista de usuarios de la aplicación de Fastly"
				handleRefresh={handleRefresh}
			>
				{body()}
			</MainAccount>
		</DashboardLayout>
	);
};
