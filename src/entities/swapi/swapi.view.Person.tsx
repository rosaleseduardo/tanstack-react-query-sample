import { type SwapiInterfaces } from '@entities/swapi';

/**
 * A component that displays information about a person from the SWAPI
 * (Star Wars API).
 *
 * The `Person` component receives a person object as props, representing
 * information about a person from the SWAPI. It renders the person's name,
 * hair color, and eye color in an unordered list.
 *
 * @param props - The props for the Person component.
 *
 * @returns A React functional component that displays the person's information.
 *
 * @example
 * ```tsx
 * import { Person } from './path/to/Person';
 *
 * const MyComponent = () => {
 *   return (
 *     <ul>
 *       <Person name="Luke Skywalker" hairColor="blond" eyeColor="blue" />
 *       <Person name="Leia Organa" hairColor="brown" eyeColor="brown" />
 *       // Add more Person components with different characters
 *     </ul>
 *   );
 * };
 * ```
 */
export function Person({ eyeColor, hairColor, name }: SwapiInterfaces.Person) {
  return (
    <li>
      {name}
      <ul>
        <li>hair: {hairColor}</li>
        <li>eyes: {eyeColor}</li>
      </ul>
    </li>
  );
}
