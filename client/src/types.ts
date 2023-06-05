export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterUser = {
  email: string;
  password: string;
  name: string;
};

export type Post = {
  id: string;
  title: string;
  body: string;
  category: Category;
  readTime: number;
  createdAt: Date;
  user: User;
};

export enum Category {
  TECHNOLOGY = 'Technology',
  BUSINESS = 'Business',
  POLITICS = 'Politics',
  SPORTS = 'Sports',
  ENTERTAINMENT = 'Entertainment',
  HEALTH = 'Health',
  SCIENCE = 'Science',
  TRAVEL = 'Travel',
  OTHER = 'Other',
}

export type CustomError = {
  message: string;
  field?: string;
};
