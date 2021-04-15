import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../commons/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCards from '../commons/GridCards';
import { Row, Button } from 'antd';
import Axios from 'axios';
import Favorite from './Sections/Favorite';
import Comment from './Sections/Comment';

function MovieDetail(props) {
    
    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [Comments, setComments] = useState([])
    const variable = { movieId: movieId }

    useEffect(() => {
        
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast)
            })
        
        Axios.post('/api/comment/getComments', variable)
            .then(response => {
                if(response.data.success) {
                    setComments(response.data.comments)
                } else{
                    alert('Failed to load comment')
                }
            })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))
    }

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

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                {/* Movie Info */}
                <MovieInfo 
                    movie={Movie}
                />
                <br />
                
                {/* Comment */}
                <Comment refreshFunction={refreshFunction} commentLists={Comments} movieId={movieId} />

                {/* Actors Grid */}
                <div style={{ display: 'flex', justifyContent:'center', margin:'2rem' }}>
                    <Button onClick={toggleActorView}>Toggle Actor View</Button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                    {Casts && Casts.map((cast, index) => (
                        <React.Fragment key={index}>
                            <GridCards 
                                image={cast.profile_path ? 
                                    `${IMAGE_BASE_URL}w500${cast.profile_path}` : require('../../default-img.jpg') }
                                castName={cast.name}
                            />
                        </React.Fragment>
                    ))}
                </Row>
                }
            </div>
        </div>
    )
}

export default MovieDetail
