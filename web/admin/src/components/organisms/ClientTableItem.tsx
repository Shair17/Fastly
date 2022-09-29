import { FC } from 'react';

interface Props {
	type: 'admin' | 'user' | 'customer' | 'dealer';
	refetch: () => void;
}

export const ClientTableItem: FC<Props> = ({ refetch, type }) => {
	return <div>ClientTableItem</div>;
};
