import { FC } from 'react';
import { Box, Group, ScrollArea, Title, Text, Button } from '@mantine/core';
import { Plus, Refresh } from 'tabler-icons-react';
import { isFunction } from '@fastly/utils';

interface Props {
	children: React.ReactNode;
	title: string;
	description: string;
	handleAddButton?: () => void | undefined;
	addIsLoading?: boolean;
	handleRefresh?: () => void | undefined;
	refreshIsLoading?: boolean;
}

export const MainAccount: FC<Props> = ({
	children,
	title,
	description,
	handleAddButton = undefined,
	addIsLoading = false,
	handleRefresh = undefined,
	refreshIsLoading = false,
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
						loading={refreshIsLoading}
					>
						REFRESCAR
					</Button>
					<Button
						leftIcon={<Plus />}
						variant="default"
						onClick={handleAddButton}
						disabled={!isFunction(handleAddButton)}
						loading={addIsLoading}
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
