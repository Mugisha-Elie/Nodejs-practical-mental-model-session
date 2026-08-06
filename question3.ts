import express, { Request, Response } from "express";

interface TodoType{
  id: number,
  title: string,
  completed: boolean
}

const app = express();
app.use(express.json())



let TODOS: TodoType[] = [];

app.post('/todos', (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({
      success: false,
      error: {
        message: 'The title field is required!'
      }
    })
    return;
  }

  const todoEntry = {
    id: Date.now(),
    title,
    completed: false,
  }

  TODOS.push(todoEntry)

  res.status(201).json({
    success: false,
    error: {
      message: 'Todo Created Successfully'
    }
  })
})


app.get('/todos', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    todos: TODOS
  })
})

app.patch('/todos/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    res.status(400).json({
      success: false,
      error: {
        message: 'Invalid Parameter'
      }
    })
    return;
  }

  const todo  = TODOS.find(todo => todo.id === Number(id))
  if (!todo) {
    res.status(404).json({
      success: false,
      error: {
        message: 'Todo Not Found!'
      }
    })
    return;
  }

  todo.completed = !todo.completed;

  res.status(200).json({
    success: true,
    todo
  })
})

app.delete('/todos/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    res.status(400).json({
      success: false,
      error: {
        message: 'Invalid Parameter'
      }
    })
    return;
  }

  TODOS = TODOS.filter(todo => todo.id !== Number(id));

  res.status(200).json({
    success: true,
    message: 'Todo Deleted Successfully',
    todos: TODOS
  })
})

app.listen(3000, () => console.log('Server listening at http://localhost:3000'))