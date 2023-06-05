import { useEffect, useState } from 'react';
import { Category, Post } from '../../types';
import { getColor } from '../common/CategoryColor';

interface CategoriesProps {
  posts: Post[];
  setSelectedPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

function Categories({ posts, setSelectedPosts }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  // Set categories dynamically based on posts
  useEffect(() => {
    const categories = posts
      .map((post) => post.category)
      .flat()
      .filter((category, index, array) => array.indexOf(category) === index)
      // Sort categories alphabetically but place 'Other' category last
      .sort((a, b) => {
        if (a === 'Other') return 1;
        if (b === 'Other') return -1;
        return a.localeCompare(b);
      });
    setCategories(categories);
  }, [posts]);

  // Filter posts based on selected categories
  useEffect(() => {
    if (selectedCategories.length === 0) return setSelectedPosts(posts);

    const selectedPosts = posts.filter((post) => {
      return selectedCategories.some((selectedCategory) => post.category.includes(selectedCategory));
    });
    setSelectedPosts(selectedPosts);
  }, [selectedCategories, posts, setSelectedPosts]);

  return (
    <div className="w-full flex justify-start items-center gap-5 py-5 pl-2 overflow-x-auto snap-x snap-mandatory">
      {categories.length > 0 &&
        categories.map((category) => (
          <button
            className={`${
              selectedCategories.includes(category) && getColor(category)
            } min-w-[100px] shrink-0 text-center px-3 py-1 rounded-lg shadow-md text-sm snap-center cursor-pointer ${
              selectedCategories.includes(category) ? 'outline-dashed' : 'outline-solid'
            } outline outline-1 outline-black
            hover:border-greyDark hover:shadow-lg`}
            key={category}
            onClick={() => {
              if (selectedCategories.includes(category)) {
                setSelectedCategories((prev) => prev.filter((prevCategory) => prevCategory !== category));
              } else {
                setSelectedCategories((prev) => [...prev, category]);
              }
            }}
          >
            {category}
          </button>
        ))}
    </div>
  );
}

export default Categories;
