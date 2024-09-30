import React from "react";
import squirrellogo from "../../assets/img/squirrellogo.png"; 
import { useMediaQuery } from 'react-responsive';

export default function Banner() {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });

    return (
        <div>
            {isDesktop && (
                <>
                <img
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
                        style={{ width: '800px' }} 
                        alt="bannerPicture"
                        src={squirrellogo}
                    />
                    <p>테블릿</p>
                </>
            )}

            {isMobile && (
                <>
                    <img
                        style={{ width: '360px' }} 
                        alt="bannerPicture"
                        src={squirrellogo}
                    />
                    <p>모바일</p>
                </>
            )}
        </div>
    );
}
