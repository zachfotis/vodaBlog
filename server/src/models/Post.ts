import mongoose from 'mongoose';

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

// An interface that describes the properties
// that are required to create a new User
export interface PostAttrs {
  userId: mongoose.Types.ObjectId;
  title: string;
  body: string;
  category: Category;
  readTime?: number;
}

// An interface that describes the properties
// that a User Model has
interface PostModel extends mongoose.Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

// An interface that describes the properties
// that a User Document has
interface PostDoc extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  body: string;
  category: Category;
  createdAt: Date;
  readTime: number;
  likes: mongoose.Types.ObjectId[];
}

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: () => Date.now(),
    },
    category: {
      type: String,
      enum: Object.values(Category),
      default: Category.OTHER,
    },
    readTime: {
      type: Number,
      default: () => Math.floor(Math.random() * 5) + 1,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        ret.likes = ret.likes.length;
      },
    },
  }
);

postSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);

export { Post };
