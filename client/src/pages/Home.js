import React from 'react';
import Scatterplot from '../components/Scatterplot';
import { dropShadow, smallDropShadow, softDropShadow } from '../components/boxShadowStyles';
import { useNavigate } from 'react-router-dom';

function Home(props) {

    const navigate = useNavigate();

    const navigateToTitle = () => {
        console.log('sfe')
        navigate("/")
    }

    return (
        <div style={{
            display: "grid",
            gridTemplateRows: "50px 1fr",
            gridTemplateColumns: "1fr"
        }} className='bg-stone-50 h-screen relative'>
            <div style={{boxShadow: softDropShadow}} className='flex p-3 bg-stone-200 border-b border-stone-300 '>
                <h1 onMouseDown={navigateToTitle} className='font-bold text-xl'>Art Metrics</h1>
            </div>
            <Scatterplot />
        </div>
    );
}

export default Home;