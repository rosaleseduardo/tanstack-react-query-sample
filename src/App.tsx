import { Posts } from '@entities/posts';
import { Core } from '@core';
import './App.css';
// import { InfinitePeople } from '@entities/swapi'

/**
 * The main entry component of the Blog 'em Ipsum application.
 *
 * The `App` component serves as the entry point of the applicationt. It also
 * wraps the entire application with the `TanStackProvider` component to provide
 * necessary context and configuration for using the TanStack React Query library.
 *
 * @returns A React functional component that represents the main application
 * layout.
 */
export const App = () => (
  <Core.Component.TanStackProvider>
    <div className="App">
      <Posts />
      {/* <InfinitePeople /> */}
    </div>
  </Core.Component.TanStackProvider>
);
