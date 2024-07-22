import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getAllArtworks } from "./utils/api";
import Home from "./pages/Home";
import Rating from "./pages/Rating_Old";

function App() {

    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const getArtworks = async () => {
            try {
                const res = await getAllArtworks();
                console.log(res.status)
                const list = await res.json();
                console.log(list)
            } catch (err) {
                console.error(err);
            }
        }

        getArtworks();
    },[])

    return (
        <div className="App">
            <Router>
                <Route exact path="/" Component={Home} />
                <Route exact path="/rating" Component={Rating} />
            </Router>
        </div>
    );
}

export default App;
