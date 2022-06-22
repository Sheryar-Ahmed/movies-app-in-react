import './App.css';
import axios from 'axios';
import { useEffect, useState } from "react";
import { debounce } from 'lodash';
import { useCallback } from 'react';
import Header from './Components/Header';
import MovieList from './Components/MovieList';
import MovieDetail from './Components/MovieDetail';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
const Container = styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:space-evenly;
`
function App() {
  const [search, setSearch] = useState('killer');
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsloading] = useState(false);


  useEffect(() => {
    if (search.toLocaleLowerCase().trim().length > 0) {
      adminHandler()

    }
  }, [search])
  const adminHandler = async () => {
    setIsloading(true);
    const response = await axios.get(`http://www.omdbapi.com/?s=${search}&apikey=4c2ef208`);
    if (response.data.Search) {
      setData(response.data.Search);
      setIsloading(false);
    } else {
      setIsError('NO EXACT MATCHES')
      setIsloading(false)
    }
  }
  const db = useCallback(
    debounce((text) => {
      const re = /^[a-zA-Z\s]+$/i;
      if (text === '' || re.test(text)) {
        setSearch(text)
      } else {
        setIsError('Only Letters are Allowed')
      }
    }, 700),
    [],
  )
  const textHandler = (text) => {
    db(text);
  };
  return <>
    <Header textHandler={textHandler} search={search} />
    {selected && <MovieDetail selected={selected} />}
    <Container >{isLoading && isLoading ? 
      <CircularProgress color="success" />
      : <MovieList movie={data} isError={isError} setSelected={setSelected} />
    }</Container>
  </>
}

export default App;
