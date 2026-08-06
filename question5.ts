import express, { Request, Response } from 'express';

const app = express();
app.use(express.json())

interface User{
  id: number;
  username: string;
  email: string;
}

const users: User[] = []
let nextUserId = 1;


app.post('/register', (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const errors: string[] = [];

  if (!username || typeof username !== "string") {
    errors.push('username is required')
  } else if (username.length < 3) {
    errors.push("username must be atleast 3 characters")
  }

  if (!email || typeof email !== "string") {
    errors.push("email is required")
  } else if (!email.includes('@') || !email.includes(".")) {
    errors.push("email must contain '@' or '.'")
  }


  if (!password || typeof password !== 'string') {
    errors.push("password is required")
  } else if (password.length < 6) {
    errors.push('password must be atleast 6 characters');
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  const newUser: User = {
    id: nextUserId++,
    username,
    email
  }

  users.push(newUser)
  res.status(201).json(newUser)
}) 


app.listen(3000, () => console.log("Server listening on http://localhost:3000"));