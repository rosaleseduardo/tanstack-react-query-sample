import { useApiClient } from './swapi.apiClient';
import { useViewModel } from './swapi.viewModel';

export const Swapi = {
  ApiClient: useApiClient,
  ViewModel: useViewModel,
};

export * as SwapiInterfaces from './swapi.interfaces';

export * from './swapi.view.InfinitePeople';
export * from './swapi.view.Person';
