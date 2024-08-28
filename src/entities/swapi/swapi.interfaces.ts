/**
 * Represents the API response object returned from an API request.
 *
 * The `APIResponse` interface is a generic interface that defines the structure
 * of an API response. It includes information such as the total count of items,
 * URLs for the next and previous pages (if available), and an array of results
 * containing the data fetched from the API.
 *
 * @typeParam T - The type of data contained in the `results` array.
 */
export interface APIResponse<T> {
  /**
   * The total count of items available in the API (e.g., total number of records).
   */
  count: number;

  /**
   * The URL to the next page of results, if available.
   * If no next page is available, this property will be `null`.
   */
  next: string;

  /**
   * The URL to the previous page of results, if available.
   * If no previous page is available, this property will be `undefined`.
   */
  previous?: string;

  /**
   * An array of items representing the data fetched from the API.
   * Each item in the array corresponds to a result object of type `T`.
   */
  results: T[];
}

/**
 * Represents information about a person.
 *
 * The `Person` interface defines the properties associated with a person's
 * attributes. It includes details such as the person's name, hair color, and
 * eye color.
 */
export interface Person {
  /**
   * The name of the person.
   */
  name: string;

  /**
   * The color of the person's hair.
   */
  hairColor: string;

  /**
   * The color of the person's eyes.
   */
  eyeColor: string;
}
