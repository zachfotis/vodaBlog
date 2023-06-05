import { useEffect, useState } from 'react';
import { Category } from '../../types';
import { getColor } from './CategoryColor';

interface CategoryBadgeProps {
  category: Category;
}

function CategoryBadge({ category }: CategoryBadgeProps) {
  const [colorClass, setColorClass] = useState('');
  // Change badge color based on category

  useEffect(() => {
    const color = getColor(category);
    setColorClass(color);
  }, [category]);

  return (
    <p className={`${colorClass} min-w-[100px] text-center text-xs font-[400] px-3 py-1 rounded-lg`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </p>
  );
}

export default CategoryBadge;
