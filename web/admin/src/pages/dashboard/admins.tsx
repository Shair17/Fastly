import { DashboardLayout } from '../../components/templates/DashboardLayout';
import { MainAccount } from '../../components/organisms/MainAccount';
import { UsersTable } from '../../components/organisms/UsersTable';
import { UserTableItem } from '../../components/organisms/UserTableItem';
import { useAdminsStore } from '../../stores/useAdminsStore';

export const DashboardAdmins = () => {
	const admins = useAdminsStore((a) => a.admins);

	return (
		<DashboardLayout>
			<MainAccount
				title="Administradores 🛡️"
				description="Aquí podrás ver la lista de administradores en Fastly"
			>
				{Object.keys(admins).length === 0 ? (
					<p>Cargando...</p>
				) : (
					<UsersTable>
						{admins.map((admin) => (
							<UserTableItem key={admin.id} {...admin} type="admin" />
						))}
					</UsersTable>
				)}
			</MainAccount>
		</DashboardLayout>
	);
};
