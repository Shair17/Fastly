import { FC } from 'react';
import {
	Box,
	Group,
	ScrollArea,
	Title,
	Text,
	ActionIcon,
	Button,
} from '@mantine/core';
import { Plus, Refresh } from 'tabler-icons-react';
import { isFunction } from '../../utils';

interface Props {
	children: React.ReactNode;
	title: string;
	description: string;
	handleAddButton?: () => void | undefined;
	handleRefresh?: () => void | undefined;
}

export const MainAccount: FC<Props> = ({
	children,
	title,
	description,
	handleAddButton = undefined,
	handleRefresh = undefined,
}) => {
	return (
		<Box>
			<Group position="apart">
				<Box>
					<Title order={1}>{title}</Title>
					<Text component="p" size="md" mt="sm" color="gray">
						{description}
					</Text>
				</Box>
				<Group>
					<Button
						leftIcon={<Refresh />}
						variant="default"
						onClick={handleRefresh}
						disabled={!isFunction(handleRefresh)}
					>
						REFRESCAR
					</Button>
					<Button
						leftIcon={<Plus />}
						variant="default"
						onClick={handleAddButton}
						disabled={!isFunction(handleAddButton)}
					>
						AGREGAR
					</Button>
				</Group>
			</Group>
			<Box>
				<ScrollArea>{children}</ScrollArea>
			</Box>
		</Box>
	);
};
