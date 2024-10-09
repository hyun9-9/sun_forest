import React, {useEffect, useState} from "react";
import squirrellogo from "../../assets/img/squirrellogo.png"; 
import { useMediaQuery } from 'react-responsive';
import "../../assets/css/Main.css";

export default function Banner({memberId}) {

    console.log('[로그]' , memberId);

    const[imag, setImag] = useState(null);
    const isMobile = useMediaQuery({ query: '(max-width: 760px' });
    const isDesktop = useMediaQuery({ query: '(min-width: 761px)' });

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

    const imagSize = isDesktop ? 100 : 60;

    return (
        <div className='banner'>
            {isDesktop && 
                <img className='desk' alt="bannerPicture" src={squirrellogo} />
            }

            {isMobile && 
            <img className='mobile' alt="bannerPicture" src={squirrellogo} />}

<div style={{
                border: '1px solid black', 
                borderRadius: '50%', 
                overflow: 'hidden', 
                width: `${imagSize}px`,
                height: `${imagSize}px`, 
                position: 'absolute', 
                top: '20%', 
                left: '20%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'translateX(-30%)' 
            }}>
                <img
                    src={`http://localhost:8080${imag}`}
                    alt="Overlay"
                    className='profile'
                />
            </div>
        </div>
    );
}
