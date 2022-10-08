import {MantineProvider, ColorSchemeProvider, ColorScheme} from '@mantine/core';
import {NotificationsProvider} from '@mantine/notifications';
import {ModalsProvider} from '@mantine/modals';
import {useHotkeys, useLocalStorage, useColorScheme} from '@mantine/hooks';

import {Routes, Route} from 'react-router-dom';

import {SocketProvider} from './modules/socket/SocketProvider';

import {NotFound404} from './pages/404';

import {Index} from './pages/index';
import {Login} from './pages/login';
import {Register} from './pages/register';
import {ForgotPassword} from './pages/forgot-password';
import {NewPassword} from './pages/new-password';

import {Dashboard} from './pages/dashboard/index';
import {DashboardStores} from './pages/dashboard/stores/index';
import {DashboardStore} from './pages/dashboard/stores/store';
import {DashboardProducts} from './pages/dashboard/products/index';
import {DashboardProduct} from './pages/dashboard/products/product';
import {DashboardOrders} from './pages/dashboard/orders/index';
import {DashboardOrder} from './pages/dashboard/orders/order';

import {RequireAuth} from './components/hoc/RequireAuth';
import {useShowSessionIsExpired} from './hooks/useShowSessionIsExpired';

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: '@fastly.customer/theme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useShowSessionIsExpired();
  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <SocketProvider>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            colorScheme,
            colors: {
              brand: [
                '#FEF0E3',
                '#FEE9DA',
                '#FECDB6',
                '#FEAB92',
                '#FE8A77',
                '#FE554A',
                '#DA3639',
                '#B62534',
                '#93172E',
                '#790E2B',
              ],
            },
            primaryColor: 'brand',
          }}
          withGlobalStyles
          withNormalizeCSS>
          <ModalsProvider>
            <NotificationsProvider>
              <Routes>
                <Route index element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/new-password" element={<NewPassword />} />

                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                />

                <Route
                  path="/dashboard/stores/*"
                  element={
                    <RequireAuth>
                      <DashboardStore />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/dashboard/stores"
                  element={
                    <RequireAuth>
                      <DashboardStores />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/dashboard/stores/:id"
                  element={
                    <RequireAuth>
                      <DashboardStore />
                    </RequireAuth>
                  }
                />

                <Route
                  path="/dashboard/products/*"
                  element={
                    <RequireAuth>
                      <DashboardProduct />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/dashboard/products"
                  element={
                    <RequireAuth>
                      <DashboardProducts />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/dashboard/products/:id"
                  element={
                    <RequireAuth>
                      <DashboardProduct />
                    </RequireAuth>
                  }
                />

                <Route
                  path="/dashboard/orders/*"
                  element={
                    <RequireAuth>
                      <DashboardOrder />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/dashboard/orders"
                  element={
                    <RequireAuth>
                      <DashboardOrders />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/dashboard/orders/:id"
                  element={
                    <RequireAuth>
                      <DashboardOrder />
                    </RequireAuth>
                  }
                />

                <Route path="*" element={<NotFound404 />} />
              </Routes>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </SocketProvider>
  );
}

export default App;
