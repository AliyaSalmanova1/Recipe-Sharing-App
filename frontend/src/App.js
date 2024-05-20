
import { useState, useEffect } from 'react'
import './App.css';

import axios from 'axios'

function App() {

  const [file, setFile] = useState()
  const [recipeText, setRecipeText] = useState("")
  const [recipePosts, setRecipePosts] = useState([])

  useEffect(() => {
    (async() => {
      const result = await axios.get('/recipes')
      console.log('result', result)
      setRecipePosts(result.data.recipes)
    })()
  }, [])
  
  
  const submit = async event => {
    event.preventDefault()

    const data = new FormData()
    data.append('image', file)
    data.append('recipeText', recipeText)

    console.log('data', data)

    const result = await axios.post('/recipes', data)
    console.log('result', result)
    setRecipePosts([result.data, ...recipePosts])


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
        onChange={e => setRecipeText(e.target.value)}
        placeholder="text"></input>

        <button type="submit">Submit</button>

      </form>
      <main>
        { recipePosts !== undefined && 
          recipePosts.map(post => {
            return (
              <figure key={post.id}>
                <img src={post.image_url}/>
                <figcaption>{post.recipeText}</figcaption>
              </figure>
            )
            
          })
        }

      </main>
      
    </div>
  );
}

export default App;
