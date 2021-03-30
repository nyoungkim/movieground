import React, { useEffect, useState } from 'react'
import './favorite.css'
import { Button } from 'antd'
import Axios from 'axios'

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoritedMovie()
    }, [])

    const fetchFavoritedMovie = () => {
        Axios.post('/api/favorite/getFavoritedMovie', { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.favorites)
                } else {
                    alert('Failed to load favorited movie')
                }
            })
    }
    
    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoritedMovie()
                } else {
                    alert('Failed to remove Favorite')
                }
            })
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
          <h2>Favorite Movies</h2>
          <hr />

        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Runtime</th>
                    <th>Remove from Favorite</th>
                </tr>
            </thead>
            <tbody>
                {Favorites.map((favorite, index) => (
                    <tr key={index}>
                        <td><a href={`/movie/${favorite.movieId}`}>{favorite.movieTitle}</a></td>
                        <td>{favorite.movieRunTime} mins</td>
                        <td><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
                    </tr>
                ))}
            </tbody>
        </table> 
        </div>
    )
}

export default FavoritePage
