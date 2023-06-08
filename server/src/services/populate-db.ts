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

    // Array with 10 paris of [lat, lng] coordinates in Europe
    const coordinates = [
      [48.8566, 2.3522],
      [51.5074, 0.1278],
      [52.52, 13.405],
      [55.7558, 37.6173],
      [59.3293, 18.0686],
      [41.9028, 12.4964],
      [41.3851, 2.1734],
      [45.4642, 9.19],
      [52.2297, 21.0122],
      [48.1486, 17.1077],
    ];

    let i = 0;
    for (const user of users) {
      user.password = 'password';
      user.tempID = user.id;
      user.address.geo.lat = coordinates[i][0];
      user.address.geo.lng = coordinates[i][1];
      i++;
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
    let posts = await data.json();

    // Randomize posts
    posts = posts.sort(() => Math.random() - 0.5);

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
