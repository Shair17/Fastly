import { DashboardLayout } from '@fastly/components/templates/DashboardLayout';
import { MainAccount } from '@fastly/components/organisms/MainAccount';
import { GlobalTable } from '@fastly/components/organisms/GlobalTable';
import useAxios from 'axios-hooks';
import { User } from '@fastly/interfaces/appInterfaces';
import { UserTableItem } from '@fastly/components/organisms/UserTableItem';

export const DashboardUsers = () => {
	const [{ error, loading: getUsersIsLoading, data: users }, refetchUsers] =
		useAxios<User[]>('/users');

	const handleRefresh = () => {
		refetchUsers();
	};

	const body = () => {
		if (getUsersIsLoading) return <p>Cargando...</p>;

		if (error || !users) return <p>Error!</p>;

		if (users.length === 0) return <p>No hay usuarios.</p>;

		return (
			<GlobalTable type="users">
				{users.map((user) => (
					<UserTableItem
						key={user.id}
						type="user"
						refetch={refetchUsers}
						{...user}
					/>
				))}
			</GlobalTable>
		);
	};

	return (
		<DashboardLayout>
			<MainAccount
				title="Usuarios 📱"
				description={`Aquí podrás ver la lista de usuarios de la aplicación de Fastly.${
					users
						? ` Hay ${users.length} usuario${users.length !== 1 ? 's' : ''}.`
						: ''
				}`}
				handleRefresh={handleRefresh}
				refreshIsLoading={getUsersIsLoading}
			>
				{body()}
			</MainAccount>
		</DashboardLayout>
	);
};
