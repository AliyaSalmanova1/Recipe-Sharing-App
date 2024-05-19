
import { useState } from 'react'
import './App.css';

import axios from 'axios'

function App() {

  const [file, setFile] = useState()
  const [text, setText] = useState("")
  
  const submit = async event => {
    event.preventDefault()

    const data = new FormData()
    data.append('image', file)
    data.append('text', text)

    console.log('data', data)

    const result = await axios.post('/recipes', data)
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
        onChange={e => setText(e.target.value)}
        placeholder="text"></input>

        <button type="submit">Submit</button>

      </form>
      <main>

      </main>
      
    </div>
  );
}

export default App;
