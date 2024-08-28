import { type FC } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useQueryClient } from './core.component.TanStackProvider.client';
import { type TanStackProviderProps } from './core.component.TanStackProvider.interfaces';

/**
 * TanStackProvider is a wrapper component that provides the necessary context
 * and configuration for using the TanStack React Query library in your application.
 *
 * The component renders the React Query's `QueryClientProvider` and
 * `ReactQueryDevtools`, and it should be placed at the root of your application
 * to enable the usage of React Query features.
 *
 * @param props - The child elements to be wrapped by the TanStackProvider.
 *
 * @returns A React functional component that wraps the provided children with
 * React Query's context and enables the React Query Devtools for debugging and
 * development purposes.
 *
 * @example
 * ```tsx
 * // App.tsx
 * import { TanStackProvider } from './path/to/TanStackProvider';
 *
 * const App = () => {
 *   return (
 *     <TanStackProvider>
 *       // Your app's components
 *     </TanStackProvider>
 *   );
 * };
 * ```
 */
export const TanStackProvider: FC<TanStackProviderProps> = (props) => {
  const client = useQueryClient();

  return (
    <QueryClientProvider client={client}>
      {props.children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
