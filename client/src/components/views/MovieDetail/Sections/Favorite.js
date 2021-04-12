import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {
    
    const userFrom = props.userFrom
    const movieId = props.movieId
    const movieTitle = props.movieInfo.title
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        movieRunTime: movieRunTime
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                setFavoriteNumber(response.data.favoriteNumber)
                if (response.data.success) {

                } else {
                    alert('Failed to get favorite number')
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('Failed to get favorite info')
                }
            })

    }, [])

    const onClickFavorite = () => {
        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                        if (response.data.success) {
                            setFavoriteNumber(FavoriteNumber - 1)
                            setFavorited(!Favorited)
                        } else {
                            alert('Failed to remove Favorite')
                        }
                    })
        }
        else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                        if (response.data.success) {
                            setFavoriteNumber(FavoriteNumber + 1)
                            setFavorited(!Favorited)
                        } else {
                            alert('Failed to add Favorite')
                        }
                    })
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
