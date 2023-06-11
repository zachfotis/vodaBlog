import { Post } from '../types';

type PostsReducerAction =
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'ADD_POSTS'; payload: Post[] }
  | { type: 'UPDATE_POST'; payload: Post }
  | { type: 'UPDATE_POSTS'; payload: Post[] }
  | { type: 'DELETE_POST'; payload: string };

export const postsReducer = (state: Post[], action: PostsReducerAction): Post[] => {
  switch (action.type) {
    case 'SET_POSTS':
      return action.payload;
    case 'ADD_POST':
      return [action.payload, ...state];
    case 'ADD_POSTS':
      return [...state, ...action.payload];
    case 'UPDATE_POST':
      return state.map((post: Post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    case 'UPDATE_POSTS':
      return state.map((post: Post) => {
        const updatedPost = action.payload.find((p: Post) => p.id === post.id);
        if (updatedPost) {
          return updatedPost;
        }
        return post;
      });

    case 'DELETE_POST':
      return state.filter((post: Post) => post.id !== action.payload);
    default:
      return state;
  }
};
