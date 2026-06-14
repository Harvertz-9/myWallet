export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface AuthSession {
  userId: string;
  name: string;
  email: string;
  loggedInAt: string;
}
