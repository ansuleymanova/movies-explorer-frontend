import React, {useEffect, useState} from 'react'
import './Preloader.css'

export default function Preloader (props) {

    return (
        <div className={props.isVisible ? "preloader" : 'preloader_hidden'}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};