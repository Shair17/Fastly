import {FC} from 'react';
import {Avatar, Badge, Group, Paper, Text} from '@mantine/core';
import {Link} from 'react-router-dom';
import {Store} from '@fastly/interfaces/appInterfaces';
import {getStoreCategory} from '@fastly/utils/getCategory';
import dayjs from 'dayjs';

interface Props extends Store {}

export const MyStoreCard: FC<Props> = ({
  address,
  category,
  createdAt,
  id,
  name,
  owner,
  ownerId,
  updatedAt,
  categoryDescription,
  closeTime,
  description,
  logo,
  openTime,
}) => {
  return (
    <Paper
      component={Link}
      to={`/dashboard/stores/${id}`}
      radius="md"
      withBorder
      p="lg">
      <Group position="apart">
        <Group>
          <Avatar src={logo} size={50} radius={100} />
          <Text size="lg" weight={500}>
            {name}
          </Text>
        </Group>
        <Badge>{getStoreCategory(category)}</Badge>
      </Group>
      <Text mt="md" color="dimmed" size="sm">
        Descripción: {description || 'Nulo'}
      </Text>
      <Text mt="md" color="dimmed" size="sm">
        Dirección: {address || 'Nulo'}
      </Text>
      <Text mt="md" color="dimmed" size="sm">
        Descripción de la categoría: {categoryDescription || 'Nulo'}
      </Text>
      <Text mt="md" color="dimmed" size="sm">
        Hora de apertura:{' '}
        {openTime ? dayjs(openTime).format('hh:mm a') : 'Nulo'}
      </Text>
      <Text mt="md" color="dimmed" size="sm">
        Hora de cierre:{' '}
        {closeTime ? dayjs(closeTime).format('hh:mm a') : 'Nulo'}
      </Text>
    </Paper>
  );
};
