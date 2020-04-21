import React, {useState, useEffect} from "react";

import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  const [repositorie, setRepositorie] = useState('')

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    api.post('repositories', {title: repositorie}).then(response => {
      setRepositories([...repositories, response.data])
      setRepositorie('')
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      if(response.status === 204){

        const index = repositories.findIndex(e => e.id === id)
        setRepositories([...repositories.slice(0, index), 
          ...repositories.slice(index +1)])        
      }
    })
  }

  return (
    <div>
      <div>
        <label>Titulo Repositório</label>
        <input type="text" value={repositorie} 
        onChange={(e) => setRepositorie(e.target.value)}/>
      </div>
      <button onClick={handleAddRepository}>Adicionar</button>

      <ul data-testid="repository-list" id="repository-list">
        {
         repositories.map(repositorie => {
           return (<li key={repositorie.id}>
             <p>{repositorie.title}</p>
             <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
             </button>
           </li>)
         }) 
          
        }
      </ul>

      
    </div>
  );
}

export default App;
