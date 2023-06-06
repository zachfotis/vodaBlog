import { Post } from '../types';

type LikedPostsReducerAction =
  | { type: 'SET_LIKED_POSTS'; payload: Post[] }
  | { type: 'ADD_LIKED_POST'; payload: Post }
  | { type: 'UPDATE_LIKED_POST'; payload: Post }
  | { type: 'DELETE_LIKED_POST'; payload: string };

export const likedPostsReducer = (state: Post[], action: LikedPostsReducerAction): Post[] => {
  switch (action.type) {
    case 'SET_LIKED_POSTS':
      return action.payload;
    case 'ADD_LIKED_POST':
      return [action.payload, ...state];
    case 'UPDATE_LIKED_POST':
      return state.map((post: Post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
    case 'DELETE_LIKED_POST':
      return state.filter((post: Post) => post.id !== action.payload);
    default:
      return state;
  }
};
