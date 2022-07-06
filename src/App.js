import React, {useState, useEffect} from 'react'
import './App.css'
import SearchLogo from './search.svg'

// components 

import MovieCard from './MovieCard'
const API_URL='http://www.omdbapi.com?apikey=5acc6ed9'

const App = () => {


  const [movies, setMovies] = useState([])
  const [value, setValue] = useState('')
  const [search, setSearch] = useState('')
  const searchMovies = async (title) =>{
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()

    setMovies(data.Search)
    console.log(movies);
  }
  useEffect(()=>{
    searchMovies(search)
  },[search])
  return (
    <div className='app'>
      <h1>MovieDB</h1>

      <div className='search'>
        <input placeholder='Search for movies'
          value={value}
          onChange={
            (e)=>{
              setValue(e.target.value)
            }
          }
        />
        <img src={SearchLogo} alt="search" onClick={()=>{
            setSearch(value)
        }}/>
      </div>
        {
          movies?.length > 0
            ? (
                <div className="container">
                    {
                      movies.map((movie)=>{
                        return <MovieCard movie={movie}/>
                      })
                    }
                </div>
            ):
              (
                <div className="empty">
                  <h2>No movies found.</h2>
                </div>
              )
        }
    </div>
  )
}

export default App