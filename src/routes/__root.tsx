import { AuthContext } from '@services/hooks/auth';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { Suspense } from 'react';
import { Toaster } from 'sonner';
import { NavigationBar } from '@components/NavBar';
import { Footer } from '@components/Footer';
import { NotFoundComponent } from '@components/NotFoundComponent';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthContext;
}>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex min-h-screen w-screen flex-col justify-between px-6 pb-6 xl:px-20">
        <NavigationBar />
        <Outlet />
        <Footer />
      </div>
      <Toaster richColors closeButton position="top-center" />
      <Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
}
