exports.repository = {
  User: {
    checkUserExists: (email) => {
      const existingUsers = [{ email: 'fernandes.victor@hotmail.com' }];

      return existingUsers.some((user) => user.email === email);
    },
    createUser: ({ name, email, password, nickname }) => ({
      id: '5765ee20-32a9-4637-bb94-dfa3685297c2',
      name,
      email,
      nickname,
      updatedAt: '2022-03-16T00:01:45.874Z',
      createdAt: '2022-03-16T00:01:45.874Z',
    }),
  },
};
