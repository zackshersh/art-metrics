export const getAllArtworks = () => {
    return fetch('https://art-metrics-server.vercel.app/api/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const getRandomArtwork = () => {
    return fetch('https://art-metrics-server.vercel.app/api/random', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const getArtwork = (id) => {
    return fetch(`https://art-metrics-server.vercel.app/api/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })
}

export const submitRatings = async (id, ratings) => {

    const response = await fetch(`https://art-metrics-server.vercel.app/api/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...ratings, _id: id})
    });

    console.log(response)
    return response;
}