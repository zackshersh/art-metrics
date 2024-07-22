import React from 'react';
import Scatterplot from '../components/Scatterplot';
import { dropShadow, smallDropShadow, softDropShadow } from '../components/boxShadowStyles';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

function Home(props) {



    return (
        <div style={{
            display: "grid",
            gridTemplateRows: "50px 1fr",
            gridTemplateColumns: "1fr"
        }} className='bg-stone-50 h-screen relative'>
            <Nav />
            <Scatterplot />
        </div>
    );
}

export default Home;