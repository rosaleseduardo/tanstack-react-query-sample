import { useApiClient } from './posts.apiClient';
import { useViewModel } from './posts.viewModel';

export const Post = {
  ApiClient: useApiClient,
  ViewModel: useViewModel,
};

export * as PostInterfaces from './posts.interfaces';

export * from './posts.view.PostDetail';
export * from './posts.view.Posts';

export * from './posts.constants';
