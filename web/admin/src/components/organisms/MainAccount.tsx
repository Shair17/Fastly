import { FC } from 'react';
import { Box, ScrollArea, Title, Text } from '@mantine/core';

interface Props {
	children: React.ReactNode;
	title: string;
	description: string;
}

export const MainAccount: FC<Props> = ({ children, title, description }) => {
	return (
		<Box>
			<Title order={1}>{title}</Title>
			<Text component="p" size="md" mt="sm" color="gray">
				{description}
			</Text>
			<Box>
				<ScrollArea>{children}</ScrollArea>
			</Box>
		</Box>
	);
};
