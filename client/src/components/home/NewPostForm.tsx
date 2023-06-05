import { useReducer, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Category } from '../../types';

interface State {
  title: string;
  text: string;
  category: Category;
}

type Action =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_TEXT'; payload: string }
  | { type: 'SET_CATEGORY'; payload: Category }
  | { type: 'RESET' };

const initialState: State = {
  title: '',
  text: '',
  category: Category.BUSINESS,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_TEXT':
      return { ...state, text: action.payload };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function NewPostForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { title, text, category } = state;
  const [isExpanded, setIsExpanded] = useState(false);
  const [textCharactersLeft, setTextCharactersLeft] = useState(500);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_TITLE', payload: event.target.value });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextCharactersLeft(500 - event.target.value.length);
    dispatch({ type: 'SET_TEXT', payload: event.target.value });
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_CATEGORY', payload: event.target.value as Category });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Do something with the form data, like send it to a server
    console.log(title, text, category);
    dispatch({ type: 'RESET' });
  };

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-3 mb-10">
      <button
        type="button"
        onClick={handleExpandClick}
        className={`w-full p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-colors duration-300 ${
          isExpanded ? 'bg-blue-300 text-black hover:bg-opacity-90' : 'bg-white text-blue-600 hover:bg-gray-100'
        }`}
      >
        {isExpanded ? <FaMinus className="inline-block mr-2" /> : <FaPlus className="inline-block mr-2" />}
        {isExpanded ? 'Hide' : 'Write a new post'}
      </button>
      {isExpanded && (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-start items-start gap-3 shadow-md p-4 rounded-lg"
        >
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent font-[600]"
            maxLength={100}
            required
          />
          <div className="w-full relative">
            <label htmlFor="text" className="sr-only">
              Body
            </label>
            <textarea
              id="text"
              name="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Add text here..."
              className="w-full h-32 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              maxLength={500}
              required
            />
            <div className="absolute bottom-2 right-2 text-gray-400 text-sm">{textCharactersLeft} characters left</div>
          </div>
          <label htmlFor="category" className="sr-only">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            required
          >
            <option value="">Select a category</option>
            {Object.values(Category).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full md:max-w-[150px] px-4 py-2 bg-blue-300 text-black font-[500] rounded-lg shadow-sm hover:bg-opacity-90 mt-5"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default NewPostForm;
