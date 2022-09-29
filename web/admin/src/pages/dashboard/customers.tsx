import { DashboardLayout } from '../../components/templates/DashboardLayout';
import { MainAccount } from '../../components/organisms/MainAccount';
import useAxios from 'axios-hooks';
import { UsersTable } from '../../components/organisms/UsersTable';
import { ClientTableItem } from '../../components/organisms/ClientTableItem';

export const DashboardCustomers = () => {
	const [{ error, loading, data: customers }, refetchCustomers] = useAxios<[]>({
		url: '/customers',
		method: 'GET',
	});

	const body = () => {
		if (loading) return <p>Cargando...</p>;

		if (error || !customers) {
			console.log(error);
			return <p>Error!</p>;
		}

		if (customers.length === 0) {
			return <p>No hay datos.</p>;
		}

		return (
			<UsersTable type="customers">
				{customers.map(
					(customer) => null
					// <ClientTableItem
					// 	key={customer.id}
					// 	{...customer}
					// 	type="customer"
					// 	refetch={refetchCustomers}
					// />
				)}
			</UsersTable>
		);
	};

	return (
		<DashboardLayout>
			<MainAccount
				title="Clientes ✨"
				description="Aquí podrás ver la lista de clientes en Fastly"
			>
				{body()}
			</MainAccount>
		</DashboardLayout>
	);
};
