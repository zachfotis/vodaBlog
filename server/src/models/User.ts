import mongoose from 'mongoose';
import { Password } from '../services/password';

type Address = {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
  geo?: {
    lat: string;
    lng: string;
  };
};

type Company = {
  name?: string;
  catchPhrase?: string;
  bs?: string;
};

// An interface that describes the properties
// that are required to create a new User
export interface UserAttrs {
  email: string;
  password: string;
  name: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
  tempID?: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
  tempID?: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: {
        street: String,
        suite: String,
        city: String,
        zipcode: String,
        geo: {
          lat: String,
          lng: String,
        },
      },
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    company: {
      type: {
        name: String,
        catchPhrase: String,
        bs: String,
      },
      required: false,
    },
    tempID: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
