import {Badge, Group, Paper, Text} from '@mantine/core';
import {FC} from 'react';
import {Icon} from 'tabler-icons-react';

interface CardCountProps {
  classes: {title: string; icon: string; diff: string};
  Icon: Icon;
  title: string;
  count: number;
  description: string;
  isRealTime: boolean;
}

export const CardCount: FC<CardCountProps> = ({
  classes,
  count,
  Icon,
  description,
  title,
  isRealTime,
}) => {
  return (
    <Paper withBorder p="md" radius="md">
      <Group position="apart">
        <Text size="xs" color="dimmed" className={classes.title}>
          {title}
          {isRealTime && (
            <Badge ml="xs" size="xs" variant="filled">
              En vivo
            </Badge>
          )}
        </Text>
        <Icon className={classes.icon} size={22} />
      </Group>

      <Group align="flex-end" spacing="xs" mt={25}>
        <Text size="lg" weight={500} className={classes.diff}>
          <span>{count || 0}</span>
        </Text>
      </Group>

      <Text size="xs" color="dimmed" mt={7}>
        {description}
      </Text>
    </Paper>
  );
};
