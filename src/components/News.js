import React, { Component } from 'react'
import NewsItem from './NewsItem'
import CircularIndeterminate from './CircularIndeterminate';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general",
    }
    static propsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
        }
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0c55548f8440447695ba41cebe9556b3&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        await this.setState({ page: this.state.page - 1, });
        this.updateNews();
    }

    handleNextClick = async () => {
        await this.setState({ page: this.state.page + 1, });
        this.updateNews();
    }


    render() {
        return (
            <div className='container my-3 flex-col'>

                {this.state.loading && <CircularIndeterminate />}

                {!this.state.loading && <h3 className='text-center'>Trending News</h3>}

                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={new Date(element.publishedAt).toGMTString()} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-around my-5">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={(this.state.page + 1) > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News




