import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../commons/MainImage'
import MovieInfo from './Sections/MovieInfo'

function MovieDetail(props) {
    
    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])

    useEffect(() => {
        
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })
        
    }, [])

    return (
        <div>
            {/* Header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* Movie Info */}
                <MovieInfo 
                    movie={Movie}
                />
                <br />
                
            </div>
        </div>
    )
}

export default MovieDetail
