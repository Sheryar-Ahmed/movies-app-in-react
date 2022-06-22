import React, { useState, useEffect } from 'react';
import LinearProgress  from '@mui/material/LinearProgress';
import axios from 'axios';
import styled from 'styled-components';
const MovieDetails = styled.div`
display:flex;
justify-content: row;
flex-wrap:wrap;
width:100%;
margin:2% 0%;
box-shadow:0px 3px 10px 0px #fff;
`
const ImageCover = styled.img`
width:300px;
object-fit:cover;
`
const MovieInfo = styled.div`
display:flex;
flex-direction:column;
flex-wrap:wrap;
margin-left:2%;
justify-content:space-evenly;
`
const MovieDetail = ({ selected }) => {
    const [movieInfo, setmovieInfo] = useState();
    const [loader,setLoader] = useState(false);
    useEffect(() => {
        setLoader(true);
        const selectedData = async () =>{
        const response = await axios.get(`http://www.omdbapi.com/?i=${selected}&apikey=4c2ef208`);
        if(response.data){
            setLoader(true);
            setmovieInfo(response.data)
            setLoader(false);
        };
    }
    selectedData()
    }, [selected])
    return <>
        {loader && loader ? <LinearProgress color="success" /> :
        <MovieDetails>
        <ImageCover src={movieInfo?.Poster} alt='hello' />
            <MovieInfo>
           <span>MOVIE: {movieInfo?.Title}</span>
           <span>ACTOR: {movieInfo?.Actors}</span>
           <span>WRITER: {movieInfo?.Writer}</span>
           <span>RELEASE-YEAR: {movieInfo?.Year}</span>
           <span>IMDBRATING: {movieInfo?.imdbRating}</span>
           <span>COUNTRY: {movieInfo?.Country}</span>
           </MovieInfo>
    </MovieDetails>
        }
        
    </>
}
export default MovieDetail;