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
            const response = await fetch(`/api/members`);
            if (response.ok) {
                const imagePath = await response.text(); 
                setImag(imagePath); 
            }
        };

        fetchImage();
    }, [memberId]); 

    console.log(imag);

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
            {isDesktop && (
                <>
                <img
                    style={{ width: '100%', height: 'auto' }} 
                    alt="bannerPicture"
                    src={squirrellogo}
                />
                <p>
                    데스크탑
                </p>
                </>
            )}

            {isTablet && (
                <>
                    <img
                        style={{ width: '800px' , height: 'auto' }} 
                        alt="bannerPicture"
                        src={squirrellogo}
                    />
                    <p>테블릿</p>
                </>
            )}

            {isMobile && (
                <>
                    <img
                        style={{ width: '360px' ,  height: 'auto'}} 
                        alt="bannerPicture"
                        src={squirrellogo}
                    />
                    <p>모바일</p>
                </>
            )}

            <img
                src={imag}
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
