import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl , author, date} = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={imageUrl ? imageUrl : "https://img.freepik.com/premium-vector/photo-icon-picture-icon-image-sign-symbol-vector-illustration_64749-4409.jpg?w=740"} className="card-img-top"  alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className='card-text'><small className='text-muted'>By {author} •  {date}</small></p>
                        <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-dark btn-sm">Read</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
