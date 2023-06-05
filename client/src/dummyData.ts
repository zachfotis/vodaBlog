import { User } from './types';

export const dummyUser: User = {
  id: '1',
  email: 'test@test.com',
  name: 'John Doe',
  address: {
    street: '123 Main St',
    suite: 'Apt 1',
    city: 'New York',
    zipcode: '12345',
    geo: {
      lat: '123',
      lng: '456',
    },
  },
  phone: '123-456-7890',
  website: 'test.com',
  company: {
    name: 'Test Company',
    catchPhrase: 'Test',
    bs: 'Test',
  },
};
