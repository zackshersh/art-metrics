export const getAllArtworks = () => {
    return fetch('/api/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const getRandomArtwork = () => {
    return fetch('/api/random', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const getArtwork = (id) => {
    return fetch(`/api/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })
}

export const submitRatings = (id, ratings) => {

    return fetch(`/api/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...ratings, _id: id})
    })
}