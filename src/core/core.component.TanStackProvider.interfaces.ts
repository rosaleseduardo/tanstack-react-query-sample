import { type ReactElement } from 'react';

/**
 * The props for the TanStackProvider component.
 */
export interface TanStackProviderProps {
  /**
   * The child element to be wrapped by the TanStackProvider.
   *
   * This prop represents the content that will be wrapped by the `TanStackProvider`.
   * Typically, this is the main content of your application that requires access to
   * React Query's features and context.
   */
  children: ReactElement;
}
