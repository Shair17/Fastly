import { useState, Fragment } from 'react';
import {
	ActionIcon,
	Avatar,
	Button,
	Group,
	Paper,
	Text,
	NumberInput,
	TextInput,
	Modal,
	useMantineTheme,
} from '@mantine/core';
import useAxios from 'axios-hooks';
import { showNotification } from '@mantine/notifications';
import { zodResolver, useForm } from '@mantine/form';
import { useModals } from '@mantine/modals';
import { Pencil, Trash } from 'tabler-icons-react';
import { Product } from '@fastly/interfaces/appInterfaces';
import { getEntityType } from '@fastly/utils/getEntityType';
import { editProductSchema } from '@fastly/schemas/schemas';
import { getRegisterErrorMessage } from '@fastly/utils/getErrorMessages';
import { formatDate } from '@fastly/utils/formatDate';

interface Props extends Product {
	type: 'admin' | 'user' | 'customer' | 'dealer' | 'store' | 'product';
	refetch: () => void;
}

export const ProductTableItem = ({
	blurHash,
	createdAt,
	id,
	image,
	name,
	price,
	storeId,
	updatedAt,
	couponId,
	description,

	type,
	refetch,
}: Props) => {
	const theme = useMantineTheme();
	const modals = useModals();
	const [editProductOpened, setEditProductOpened] = useState(false);
	const [{ loading: editProductIsLoading }, executeEditProduct] = useAxios(
		{
			url: `/products/${id}`,
			method: 'PUT',
		},
		{ manual: true }
	);
	const [, executeDeleteProduct] = useAxios(
		{
			url: `/products/${id}`,
			method: 'DELETE',
		},
		{
			manual: true,
		}
	);
	const editForm = useForm({
		schema: zodResolver(editProductSchema),
		initialValues: {
			name,
			description,
			price,
			blurHash,
			storeId,
			image,
		},
	});

	const handleEditProduct = editForm.onSubmit(
		({ blurHash, description, image, name, price, storeId }) => {
			executeEditProduct({
				data: {
					storeId,
					name,
					description,
					blurHash,
					price,
					image,
				},
			})
				.then(() => {
					showNotification({
						message: 'Producto editado correctamente',
						color: 'green',
					});
					setEditProductOpened(false);
					refetch();
				})
				.catch((error) => {
					if (error?.response?.data.message) {
						showNotification({
							title: 'Error!',
							message: getRegisterErrorMessage(error.response.data.message),
							color: 'red',
						});
					}
				});
		}
	);

	const openDeleteModal = () => {
		modals.openConfirmModal({
			title: `Eliminar ${getEntityType(type)}`,
			centered: true,
			children: (
				<Text size="sm" inline>
					Estás seguro que quieres eliminar a <strong>{name}</strong>? Todos los
					datos relacionados al producto serán eliminados.
				</Text>
			),
			labels: {
				confirm: `Eliminar ${getEntityType(type)}`,
				cancel: 'Cancelar',
			},
			confirmProps: { color: 'red' },
			onConfirm: () => {
				executeDeleteProduct()
					.then(() => {
						showNotification({
							title: 'Eliminado',
							message: `Producto ${name} borrado correctamente.`,
							color: 'green',
						});

						refetch();
					})
					.catch((error) => {
						if (error?.response?.data.message) {
							showNotification({
								title: 'Error!',
								message: error.response.data.message,
								color: 'red',
							});
						}
					});
			},
		});
	};

	return (
		<Fragment>
			<Modal
				opened={editProductOpened}
				onClose={() => setEditProductOpened(false)}
				title="Editar Producto"
				centered
				size="lg"
				overlayColor={
					theme.colorScheme === 'dark'
						? theme.colors.dark[9]
						: theme.colors.gray[2]
				}
				overlayOpacity={0.55}
				overlayBlur={3}
			>
				<Paper>
					<form onSubmit={handleEditProduct}>
						<TextInput
							label="Nombre del Producto"
							placeholder="Ingresa el nombre del producto"
							required
							type="text"
							mt="md"
							{...editForm.getInputProps('name')}
						/>
						<TextInput
							label="Descripción del Producto"
							placeholder="Ingresa la descripción del producto"
							type="text"
							mt="md"
							{...editForm.getInputProps('description')}
						/>
						<TextInput
							label="Blur Hash del Producto"
							placeholder="Ingresa Blur Hash del producto"
							required
							type="text"
							mt="md"
							{...editForm.getInputProps('blurHash')}
						/>
						<TextInput
							label="Identificador de negocio del producto"
							placeholder="Ingresa el identificador de negocio del producto"
							required
							type="text"
							mt="md"
							{...editForm.getInputProps('storeId')}
						/>
						<NumberInput
							label="Precio del producto en soles"
							placeholder="Ingresa el precio del producto en soles"
							mt="md"
							required
							decimalSeparator=","
							min={0}
							stepHoldDelay={500}
							stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
							{...editForm.getInputProps('price')}
						/>
						<TextInput
							label="Imagen del producto"
							placeholder="Ingresa la URL de la imagen del producto"
							required
							type="text"
							mt="md"
							{...editForm.getInputProps('image')}
						/>

						<Group mt="xl">
							<Button
								fullWidth
								color="primary"
								type="submit"
								loading={editProductIsLoading}
							>
								Editar Producto
							</Button>
						</Group>
					</form>
				</Paper>
			</Modal>

			<tr>
				<td>
					<Avatar size={30} radius={30} src={image} />
				</td>
				<td>
					<Text size="sm" weight={500} lineClamp={1} title={name}>
						{name}
					</Text>
				</td>
				<td>
					<Text size="sm" weight={500} lineClamp={1} title={description}>
						{description || 'Nulo'}
					</Text>
				</td>
				<td>
					<Text size="sm" weight={500} lineClamp={1} title={price.toString()}>
						S/. {price}
					</Text>
				</td>
				<td>
					<Text size="sm" weight={500} lineClamp={1} title={image}>
						{image}
					</Text>
				</td>
				<td>
					<Text size="sm" weight={500} lineClamp={1} title={blurHash}>
						{blurHash}
					</Text>
				</td>
				<td>
					<Text size="sm" weight={500} lineClamp={1} title={storeId}>
						{storeId}
					</Text>
				</td>
				<td>
					<Text size="sm" color="gray" title={createdAt}>
						{formatDate(new Date(createdAt))}
					</Text>
				</td>
				<td>
					<Text size="sm" color="gray" title={updatedAt}>
						{formatDate(new Date(updatedAt))}
					</Text>
				</td>
				<td>
					<Group spacing={0} position="right">
						<ActionIcon onClick={() => setEditProductOpened(true)}>
							<Pencil size={16} />
						</ActionIcon>
						<ActionIcon
							color="red"
							title="Eliminar Producto"
							onClick={openDeleteModal}
						>
							<Trash size={16} />
						</ActionIcon>
					</Group>
				</td>
			</tr>
		</Fragment>
	);
};
