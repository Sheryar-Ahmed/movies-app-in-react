import * as React from 'react';
import styled from 'styled-components';
const Movie = styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
justify-content:center;
padding:10px;
width:200px;
box-shadow:0px 3px 10px 0 #aaa;
cursor:pointer;
`
const CoverImage = styled.img`
object-fit:cover;
height:362px;
`
const MovieList = ({ movie, isError, setSelected }) => {
    return <>
        {movie.map((list) => (
            <Movie onClick= {() => setSelected(list.imdbID)} key={list.imdbID}>

                <CoverImage
                    alt="green iguana"
                    src={list.Poster}
                    width='200px'
                    height='300px'
                />
            </Movie>
        ))}
        {isError}
    </>
}
export default MovieList;