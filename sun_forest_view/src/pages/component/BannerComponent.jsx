import React, {useEffect, useState} from "react";
import squirrellogo from "../../assets/img/squirrellogo.png"; 
import { useMediaQuery } from 'react-responsive';

export default function Banner({memberId}) {

    console.log('[로그]' , memberId);

    const[imag, setImag] = useState(null);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

    useEffect(() => {
        console.log('[로그 1 ]', memberId); 
        const fetchImage = async () => {
            const response = await fetch(`http://localhost:8080/api/members/${memberId}/img`);
            console.log(response);
            if (response.ok) {
                const imagePath = await response.text(); 
                console.log('응답', imagePath)
                setImag(imagePath); 
            }
        };

        fetchImage();
    }, [memberId]); 

    console.log('이미지경로' , imag);

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
            {isDesktop && 
                <img style={{ width: '100%', height: 'auto' }} alt="bannerPicture" src={squirrellogo} />
            }

            {isTablet && 
            <img style={{ width: '800px' , height: 'auto' }} alt="bannerPicture" src={squirrellogo} /> }

            {isMobile && 
            <img style={{ width: '360px' ,  height: 'auto'}} alt="bannerPicture" src={squirrellogo} />}

            <img
                src={`http://localhost:8080${imag}`}
                alt="Overlay"
                style={{
                    position: 'absolute', 
                    top: '20%', 
                    left: '20%',
                    width: '100px',
                    height: '100px', 
                    objectFit: 'contain' 
                }} 
            />
        </div>
    );
}
