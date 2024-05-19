
import { useState } from 'react'
import './App.css';

import axios from 'axios'

function App() {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
  
  const submit = async event => {
    event.preventDefault()

    const data = new FormData()
    data.append('image', file)
    data.append('description', description)

    const result = await axios.post('/posts', data)
    console.log('result', result)


  }
  
  return (
    <div className="App">
      <header>
        <h1>App 3000</h1>

      </header>
      <form onSubmit={submit}>
        <input type="file" 
        filename={file}
        onChange={e => setFile(e.target.files[0])}
        accept="image/*"></input>
        <input type="text"
        onChange={e => setDescription(e.target.value)}
        placeholder="description"></input>
        <button type="submit">Submit</button>
      </form>
      <main>

      </main>
      
    </div>
  );
}

export default App;
