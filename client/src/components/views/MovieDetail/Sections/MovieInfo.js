import React from 'react'
import { Descriptions } from 'antd'
import ReactStars from 'react-stars'

function MovieInfo(props) {

    let { movie } = props;
    const rating = movie.vote_average/2;
    const Genres = movie.genres;

    return (
        <Descriptions title="Information" bordered>
            <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
            {movie.release_date && <Descriptions.Item label="Release Date">{movie.release_date}</Descriptions.Item>}
            <Descriptions.Item label="Genre" span={2}>{Genres && Genres.map((genre, index) => {
                return(
                    <span key={genre.id}>{genre.name}{index < Genres.length - 1 ? ',\u00A0' : ''}</span>
                );
            })}
            </Descriptions.Item>
            <Descriptions.Item label="Runtime">{movie.runtime} min</Descriptions.Item>
            {movie.revenue &&
                <Descriptions.Item label="Revenue">
                    {movie.revenue.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    })}
                </Descriptions.Item>
            }
            <Descriptions.Item label="Rating">
                <ReactStars
                    value={rating}
                    edit={false}
                />
            </Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo
