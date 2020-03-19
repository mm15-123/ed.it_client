import React from 'react'
import { Container } from '@material-ui/core';
import { Presentation, Slide } from 'react-presents'

const Content = (props) => {
    return (
        <div className={Container}>
            <h1>{props.ContentName}</h1>
            <h1>{props.Description}</h1>

        </div>
    )
}

export default Content;