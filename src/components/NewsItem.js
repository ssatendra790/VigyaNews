import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl } = this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{ width: "16rem" }}>
                    <img src={imageUrl ? imageUrl : "https://images.unsplash.com/photo-1634738881327-50dd958f557a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"} className="card-img-top h-50"  alt="..." />
                    <div className="card-bosdy">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-dark btn-sm">Read</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
