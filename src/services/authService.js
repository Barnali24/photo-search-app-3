export const getUsers = async () => {
  try {
    // Update the URL to point to your JSON Server endpoint for users
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Could not load users:", error);
    return [];
  }
};

export const login = async (username, password) => {
  try {
    const users = await getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      return user;
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    throw error;
  }
};

export const signup = async (username, email, password, role) => {
  try {
    const users = await getUsers();
    const userExists = users.some(
      (user) => user.username === username || user.email === email
    );

    if (userExists) {
      throw new Error("User already exists");
    } else {
      // Create a new user object
      const newUser = { username, email, password, role }; // In a real app, you should hash the password

      // Make a POST request to JSON Server to create the new user
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // The JSON Server will return the newly created user object, including an auto-generated id
      const createdUser = await response.json();
      return createdUser;
    }
  } catch (error) {
    throw error;
  }
};
