import { Category, Post } from '../models/Post';
import { User } from '../models/User';

async function populateUsers() {
  try {
    // Check if there are any users in the database

    const usersInDB = await User.find({});

    if (usersInDB.length > 0) {
      return false;
    }

    const data = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await data.json();

    for (const user of users) {
      user.password = 'password';
      user.tempID = user.id;
      const newUser = User.build(user);
      await newUser.save();
    }

    console.log(`Database populated with: ${users.length} users`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function populatePosts() {
  try {
    // Check if there are any posts in the database

    const postsInDB = await Post.find({});

    if (postsInDB.length > 0) {
      return false;
    }

    const data = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await data.json();

    for (const post of posts) {
      const user = await User.findOne({ tempID: post.userId });
      // Replace the fetched ID with the actual ID
      post.userId = user?.id;
      // Randomize the category
      const categories = Object.values(Category);
      post.category = categories[Math.floor(Math.random() * categories.length)];
      // Calculate the read time based on the length of the body
      post.readTime = Math.floor(post.body.length / 1000) + 1;

      const newPost = Post.build(post);
      await newPost.save();
    }

    console.log(`Database populated with: ${posts.length} posts`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function cleanTempID() {
  try {
    const users = await User.find({});

    for (const user of users) {
      user.tempID = undefined;
      await user.save();
    }

    console.log('Temporary IDs cleaned');
  } catch (error) {
    console.log(error);
  }
}

export async function populateDB() {
  const users = await populateUsers();
  const posts = await populatePosts();

  if (users && posts) {
    await cleanTempID();
  }
}
