import React from "react";
import sunforestimg from "../../assets/img/sunforestimg.png"; 


export default function banner() {

    return (
        <div style={{width: '100%', border: '2px solid black'}}>
    
            <img style={{width:'100%', height: '300px'}} alt="bannerPicture" src={sunforestimg}></img>
        </div>
    );


}