import React from 'react';
import { Link } from 'react-router-dom';
import logo from './News.svg'

const NewItem = (props) => {
    return (
        <div className='my-3'>
            <div className="card">
                <img src={props.image === null ? logo : props.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description === null ? "No description" : props.description.slice(0, 90)}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {props.author === null ? 'Unknown' : props.author} on {new Date(props.date).toGMTString()}</small></p>
                    <Link to={props.url} target='_blank' className="btn btn-sm btn-primary">Read more</Link>
                </div>
            </div>
        </div>
    )
}

export default NewItem