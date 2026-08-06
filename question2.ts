import express, { Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json())

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const timeStamp = new Date().toISOString();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`[${timeStamp}] ${req.method} ${req.path} - ${duration}ms`)
  })

  next();
}

app.use(requestLogger)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({message: 'Welcome to our home page'})
})

app.get('/users', (req: Request, res: Response) => {
  res.status(200).json({
    users: [
      { id: 1, name: 'john', email: 'john@mail.com' },
      { id: 2, name: 'doe', email: 'doe@mail.com' }
    ]
  })
})

app.listen(3000, () => console.log('Server listening at http://localhost:3000'))