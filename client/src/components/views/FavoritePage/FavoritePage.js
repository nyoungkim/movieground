import React, { useEffect, useState } from 'react'
import './favorite.css'
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
                    <th>Movie Title</th>
                    <th>Movie Runtime</th>
                    <td>Remove from Favorite</td>
                </tr>
            </thead>
            <tbody>
                {Favorites.map((favorite, index) => (
                    <tr ket={index}>
                        <td>{favorite.movieTitle}</td>
                        <td>{favorite.movieRunTime} mins</td>
                        <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
                    </tr>
                ))}
            </tbody>
        </table> 
        </div>
    )
}

export default FavoritePage
