import express, { response } from 'express';
import cors from 'cors';

const app = express()
app.use(express.json());
app.use(cors());


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.json(persons)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const targetPerson = persons.find(person => person.id === id)
  if (targetPerson)
    response.json(targetPerson)
  else
    response.status(404).send({error: 'Person not found'})
})

app.post('/api/persons', (request, response) => {
  const person = request.body;
  console.log(person)
  if (!person.name || !person.number)
  {
    response.status(400).send({error: 'Missing name or number field'})
    return;
  }
  const similarNumber = persons.find((p) => person.name === p.name)
  if (similarNumber)
  {
    response.status(400).send({ error: 'name must be unique' })
    return;
  }
  person.id = Math.floor(Math.random() * 1_000_000);
  persons = persons.concat(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
    const totalNumbers = persons.length > 0 ? persons.length : 0
    response.send(`<p>Phonebook has info for ${totalNumbers}</p><p>${new Date().toString()}</p>`)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})