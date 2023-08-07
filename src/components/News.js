// import React, { Component } from 'react'
// import NewsItem from './NewsItem'
// import CircularIndeterminate from './CircularIndeterminate';
// import PropTypes from 'prop-types'

// export class News extends Component {

//     static defaultProps = {
//         country: "in",
//         pageSize: 8,
//         category: "general",
//     }
//     static propsTypes = {
//         country: PropTypes.string,
//         pageSize: PropTypes.number,
//         category: PropTypes.string,
//     }

//     capitalizeFirstLetter = (string) => {
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }

//     constructor(props) {
//         super(props);
//         this.state = {
//             articles: [],
//             loading: true,
//             page: 1,
//         }
//         document.title = `${this.capitalizeFirstLetter(this.props.category)} - VigyaNews`
//     }

    // async updateNews() {
    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0c55548f8440447695ba41cebe9556b3&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    //     this.setState({ loading: true });
    //     let data = await fetch(url);
    //     let parsedData = await data.json();

    //     this.setState({
    //         articles: parsedData.articles,
    //         totalResults: parsedData.totalResults,
    //         loading: false,
    //     })
    // }

    // async componentDidMount() {
    //     this.updateNews();
    // }

//     handlePrevClick = async () => {
//         await this.setState({ page: this.state.page - 1, });
//         this.updateNews();
//     }

//     handleNextClick = async () => {
//         await this.setState({ page: this.state.page + 1, });
//         this.updateNews();
//     }


//     render() {
//         return (
//             <div className='container my-3 flex-col'>

//                 {this.state.loading && <CircularIndeterminate />}

//                 {!this.state.loading && <h3 className='text-center'> {this.capitalizeFirstLetter(this.props.category)}  - Trending Now</h3>}

//                 <div className="row">
//                     {!this.state.loading && this.state.articles.map((element) => {
//                         return <div className="col-md-4" key={element.url}>
//                             <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={new Date(element.publishedAt).toGMTString()} />
//                         </div>
//                     })}
//                 </div>
//                 <div className="container d-flex justify-content-around my-5">
//                     <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
//                     <button disabled={(this.state.page + 1) > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
//                 </div>
//             </div>
//         )
//     }
// }

// export default News




// ----------BELOW IMPLEMENTATION OF NEWS COMPONENT USES INFINITE SCROLL COMPONENTS AND ABOVE CODE IS USING NEXT/PREVIOUS BUTTONS -------//


import React, { Component } from 'react'
import NewsItem from './NewsItem'
import CircularIndeterminate from './CircularIndeterminate';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general",
        apiKey: ""
    }
    static propsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - VigyaNews`
    }
    
    async updateNews() {
        console.log(this.props.apikey);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.props.setProgress(10);

        this.setState({ loading: true });
        let data = await fetch(url);

        this.props.setProgress(40);


        let parsedData = await data.json();

        this.props.setProgress(70);

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })

        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        
        this.setState({page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true }); 
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false, 
        })
    };


    render() {
        return (
            <>  
                {this.state.loading && <CircularIndeterminate/>}
                <h3 className='text-center'> {this.capitalizeFirstLetter(this.props.category)}  - Trending Now</h3>
                <InfiniteScroll 
                dataLength={this.state.articles.length} 
                next={this.fetchMoreData} 
                hasMore={this.state.articles.length !== this.state.totalResults} 
                loader={this.state.loading && <CircularIndeterminate/>}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element,index) => {
                                return <div className="col-md-4" key={index}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={new Date(element.publishedAt).toGMTString()} />
                                </div>
                            })} 
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News




