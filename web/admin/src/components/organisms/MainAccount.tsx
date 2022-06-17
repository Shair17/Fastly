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
import { Plus } from 'tabler-icons-react';

interface Props {
	children: React.ReactNode;
	title: string;
	description: string;
	addButtonDisabled?: boolean;
	handleAddButton?: () => void | undefined;
}

export const MainAccount: FC<Props> = ({
	children,
	title,
	description,
	addButtonDisabled = false,
	handleAddButton = undefined,
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
				<Button
					leftIcon={<Plus />}
					variant="default"
					onClick={handleAddButton}
					disabled={addButtonDisabled}
				>
					AGREGAR
				</Button>
			</Group>
			<Box>
				<ScrollArea>{children}</ScrollArea>
			</Box>
		</Box>
	);
};
