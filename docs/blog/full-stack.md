# 🏗️ Building a Full-Stack Website: Front-End & Back-End

In this article, we will walk you through the process of building a full-stack website, covering the front-end and back-end aspects of the project. We will start by designing the project structure, moving on to normalizing the database, setting up Supabase for backend services, and then exploring the frameworks and tools used for building both the front-end and back-end.

## 📑 Table of Contents

1. [📂 Project Structure](#project-structure)
2. [🗄️ Database Design with Supabase](#database-design-with-supabase)
3. [🎨 Front-End Development with Vue.js](#front-end-development-with-vuejs)
4. [🔐 User Authentication with API](#user-authentication-with-api)
5. [🖥️ Back-End Development with Node.js](#back-end-development-with-nodejs)
6. [📝 Handling Forms, CRUD, and Dashboard](#handling-forms-crud-and-dashboard)
7. [🏁 Conclusion](#conclusion)


---

## <a id="project-structure"></a> 📂 Project Structure

Before we dive into the technical details, let's first create the structure of the project. A typical full-stack application consists of both a front-end and a back-end. We'll organize the project with separate directories for each.

### 📁 Directory Structure

```
my-project/
├── client/               # Front-end application (Vue.js)
│   ├── src/
│   └── public/
├── server/               # Back-end application (Node.js)
│   ├── src/
│   └── routes/
├── .gitignore
└── README.md
```

## <a id="database-design-with-supabase"></a> 🗄️ Database Design with Supabase

### ❓ What is Supabase?

**Supabase** is an open-source backend-as-a-service (BaaS) platform that offers powerful tools to create a backend for your application. Supabase provides a PostgreSQL database, authentication, storage, and real-time subscriptions—all with minimal setup required. It's an ideal choice for building and deploying modern web applications.

### Steps to Create a Database in Supabase

1. **Create a Supabase Account**  
   First, create an account on [Supabase](https://supabase.io/) if you haven't already. Once you've signed up, you can create a new project.

2. **Create a New Project**  
   After logging into your Supabase dashboard, click on the "New Project" button. You’ll need to provide a project name and choose a password for your database.

3. **Create Database Tables**  
   Supabase uses PostgreSQL for database storage, so we can create tables and define relationships between them.

   Example: Create two tables—`users` and `posts`—for user authentication and post management.

   **SQL Query for Users Table**:

   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(255) UNIQUE NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT current_timestamp
   );
   ```

   **SQL Query for Posts Table**:

   ```sql
   CREATE TABLE posts (
     id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     content TEXT,
     user_id INT REFERENCES users(id),
     created_at TIMESTAMP DEFAULT current_timestamp
   );
   ```

4. **Managing Database Relationships**  
   Use foreign keys to define relationships between tables. In the `posts` table, the `user_id` field references the `id` field from the `users` table. This is an example of a one-to-many relationship, where each user can have multiple posts.

---

### 🔒 Controlling Row-Level Security (RLS)

Row-Level Security (RLS) is a feature in PostgreSQL that enables you to control access to rows in a table based on the current user or other conditions. Supabase allows you to enable and manage RLS directly from the Supabase dashboard.

To enable RLS, you need to follow these steps:

1. **Enable RLS on a Table**
   - Navigate to the "Table Editor" in the Supabase dashboard.
   - Select a table (e.g., `posts`).
   - Enable RLS by clicking the "Row Level Security" toggle.

2. **Create Policies for Access Control**  
   After enabling RLS, you can define policies to restrict or allow access to data based on the current user. For example, let’s allow users to only see their own posts.

   **Example Policy to Allow Users to View Only Their Posts**:

   ```sql
   CREATE POLICY "Allow select own posts"
   ON posts
   FOR SELECT
   USING (user_id = auth.uid());
   ```

   This policy ensures that a user can only select (view) posts where the `user_id` matches the user’s ID (which is automatically fetched from the authentication system).

3. **Other RLS Policies**  
   You can define more policies for `INSERT`, `UPDATE`, and `DELETE` actions, such as:
   
   - **Allowing users to update their own posts**:
   
     ```sql
     CREATE POLICY "Allow update own posts"
     ON posts
     FOR UPDATE
     USING (user_id = auth.uid());
     ```
   
   - **Allowing users to delete their own posts**:
   
     ```sql
     CREATE POLICY "Allow delete own posts"
     ON posts
     FOR DELETE
     USING (user_id = auth.uid());
     ```

---

### 🔐 Authentication with Supabase

Supabase offers built-in authentication to manage users. It includes email/password authentication, social login providers, and JWT (JSON Web Token) for session management.

#### 🖥️ Steps to Enable Authentication

1. **Set Up Authentication in Supabase**  
   In the Supabase dashboard, go to the "Authentication" section and enable email/password signups. You can also enable social logins (Google, GitHub, etc.) if you prefer.

2. **Registering a User**  
   To register a new user, we can use the Supabase API. For example, using the **Supabase JavaScript client**:

   ```js
   const { data, error } = await supabase.auth.signUp({
     email: 'user@example.com',
     password: 'password123',
   });
   ```

   This will send a confirmation email to the user for verifying their account.

3. **Login with Supabase**  
   After registration, users can log in with their credentials using the `signIn` method:

   ```js
   const { user, session, error } = await supabase.auth.signIn({
     email: 'user@example.com',
     password: 'password123',
   });
   ```

   After successful login, a session token is returned, which can be used to authenticate requests to your APIs.

4. **Managing User Sessions**  
   Supabase uses JWT tokens for managing user sessions. The token is automatically refreshed for you, and you can use it to authenticate API requests.

---

### 📝 Other Key Supabase Features

1. **Real-Time Database with Supabase**  
   Supabase offers real-time capabilities built into PostgreSQL. You can subscribe to changes in your database and receive updates without refreshing the page. This is great for applications that need real-time data, like chat apps or collaborative tools.

   Example of subscribing to changes in the `posts` table:

   ```js
   const postsSubscription = supabase
     .from('posts')
     .on('INSERT', payload => {
       console.log('New post added:', payload.new);
     })
     .subscribe();
   ```

2. **Supabase Storage**  
   Supabase provides a file storage solution for managing files like images, videos, or documents. You can store and retrieve files in Supabase Storage.

   Example of uploading an image:

   ```js
   const { data, error } = await supabase.storage
     .from('images')
     .upload('profile-pic.jpg', file);
   ```

3. **Supabase Edge Functions**  
   Supabase Edge Functions allow you to run server-side logic with low-latency execution on the edge. This is useful for running background tasks or handling webhook requests.

4. **Supabase API**  
   Supabase automatically generates an API based on your database schema. You can interact with this API using RESTful calls, which include full CRUD operations. This makes building your back-end APIs quick and easy.

---

Supabase is a powerful platform for building modern web applications, offering a range of features including a fully managed PostgreSQL database, authentication, real-time updates, and file storage. By leveraging Supabase, you can quickly set up and scale your application's backend without having to worry about managing infrastructure. Whether you're building a simple blog or a complex data-driven app, Supabase provides the tools you need to get started quickly and efficiently.

By combining the database design, authentication, and security features in Supabase with a front-end framework like Vue.js, you can create robust, full-stack web applications with ease.

---

## <a id="front-end-development-with-vuejs"></a> 🎨 Front-End Development with Vue.js

For the front-end, we will use **Vue.js**, a popular JavaScript framework. Vue.js is known for its simplicity and flexibility, which makes it an ideal choice for building interactive UIs.

### 🚀 Steps to Set Up Vue.js:

1. Initialize a new Vue.js project using Vite:
   
   ```bash
   npm create vite@latest client --template vue
   cd client
   npm install
   ```

2. Create components for user login, registration, and displaying posts.
3. Use **Vue Router** to navigate between different pages, such as home, login, register, and dashboard.

Example of a Vue component for the login page (`Login.vue`):

```vue
<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

function handleLogin() {
  // Send API request to authenticate user
  console.log('Logging in:', username.value);
}
</script>
```

---

## <a id="user-authentication-with-api"></a> 🔐 User Authentication with API

We will use a REST API to handle the user login and registration process. Our back-end server will expose endpoints for authentication and managing user data.

### 🔐 API Endpoints for Authentication:
1. **POST `/api/register`**: Register a new user.
2. **POST `/api/login`**: Authenticate a user.

### 🖥️ Example Code for Login API:

```js
// server/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Client } = require('@supabase/supabase-js');
const supabase = new Client('SUPABASE_URL', 'SUPABASE_KEY');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Fetch user from database
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (error || !data) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Check password
  const validPassword = await bcrypt.compare(password, data.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', user: data });
});

module.exports = router;
```

---

## <a id="back-end-development-with-nodejs"></a> 🆕 Back-End Development with Node.js

For the back-end, we will use **Node.js** with the **Express** framework. This setup will allow us to create RESTful APIs for user authentication, CRUD operations, and dashboard management.

### 📊 Setting Up Node.js:
1. Initialize a new Node.js project:
   ```bash
   mkdir server
   cd server
   npm init -y
   npm install express bcrypt @supabase/supabase-js body-parser
   ```

2. Create API routes for authentication, CRUD, and dashboard functionality.

---

## <a id="handling-forms-crud-and-dashboard"></a> 📝 Handling Forms, CRUD, and Dashboard

In this section, we will implement the logic for handling user input forms, performing CRUD operations, and creating a user dashboard.

### 📂 Handling Forms and CRUD Operations:

In the front-end, we will create forms for users to submit data such as creating new posts. These forms will send HTTP requests to our back-end APIs.

### Example Code for Creating a Post:

```vue
<template>
  <div>
    <h2>Create Post</h2>
    <form @submit.prevent="createPost">
      <input v-model="title" type="text" placeholder="Title" required />
      <textarea v-model="content" placeholder="Content"></textarea>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const title = ref('');
const content = ref('');

async function createPost() {
  const response = await axios.post('/api/posts', { title: title.value, content: content.value });
  console.log('Post created:', response.data);
}
</script>
```

### Dashboard:

After login, users will be redirected to a dashboard where they can view their posts, update their profile, and perform other actions. The dashboard will interact with the back-end API to fetch and display user-specific data.

---

## Conclusion

In this article, we've covered the process of building a full-stack website, from database design with Supabase, front-end development with Vue.js, back-end development with Node.js, and handling authentication and CRUD operations. By combining these technologies, you can create a powerful and dynamic web application.

This is just the beginning—there's so much more you can add, such as deploying your app, adding real-time features with WebSockets, or incorporating third-party integrations. Happy coding!

---

This comprehensive guide covers the key aspects of building both the front-end and back-end of a web application. You can enhance and adapt it for your specific project needs!