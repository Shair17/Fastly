import {useState, FC} from 'react';
import {AppShell, useMantineTheme} from '@mantine/core';
import {Navbar} from '@fastly/components/organisms/Navbar';
import {Header} from '@fastly/components/organisms/Header';
import {RequireAuth} from '@fastly/components/hoc/RequireAuth';

interface Props {
  children?: React.ReactNode;
}

export const DashboardLayout: FC<Props> = ({children}) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <RequireAuth>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        navbar={<Navbar hidden={opened} />}
        header={<Header opened={opened} setOpened={setOpened} />}>
        {children}
      </AppShell>
    </RequireAuth>
  );
};
