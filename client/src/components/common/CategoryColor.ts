import { Category } from '../../types';

export function getColor(category: Category): string {
  switch (category) {
    case 'Technology':
      return 'bg-blue-400 text-white';

    case 'Business':
      return 'bg-green-400 text-black';

    case 'Politics':
      return 'bg-red-400 text-white';

    case 'Sports':
      return 'bg-yellow-400 text-black';

    case 'Entertainment':
      return 'bg-purple-400 text-white';

    case 'Health':
      return 'bg-pink-400 text-white';

    case 'Science':
      return 'bg-indigo-400 text-white';

    case 'Travel':
      return 'bg-orange-400 text-gray-800';

    case 'Other':
      return 'bg-gray-400 text-white';

    default:
      return 'bg-gray-400 text-white';
  }
}
