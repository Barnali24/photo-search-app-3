export const getUsers = () => {
 
  const users = JSON.parse(localStorage.getItem('users')) || [
    { username: 'user1', email: 'user1@example.com', password: 'pass1' },
    { username: 'user2', email: 'user2@example.com', password: 'pass2' },
  ];
  return users;
};

export const setUsers = (users) => {
  
  localStorage.setItem('users', JSON.stringify(users));
};

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    const users = getUsers();console.log(users);
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      // resolve({ username: user.username });
      resolve(user);
    } else {
      reject(new Error('Invalid credentials'));
    }
  });
};

export const signup = (username, email, password,role) => {
  return new Promise((resolve, reject) => {
    // Simulate checking for an existing user
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.some(user => user.username === username || user.email === email);

    if (userExists) {
      // Reject the promise if the user already exists
      reject(new Error('User already exists'));
    } else {
      // Create a new user object
      const newUser = { username, email, password, role }; // In a real app, you should hash the password
      // Add the new user to the array of existing users
      const updatedUsers = [...existingUsers, newUser];
      // Save the updated users array to local storage
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      // Resolve the promise with the new user's data
      resolve(newUser);
    }
  });
};
