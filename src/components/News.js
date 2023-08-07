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
//         document.title = `${this.capitalizeFirstLetter(props.category)} - VigyaNews`
//     }

// async updateNews() {
//     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0c55548f8440447695ba41cebe9556b3&page=${page}&pageSize=${props.pageSize}`;

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
//         await this.setState({ page: page - 1, });
//         this.updateNews();
//     }

//     handleNextClick = async () => {
//         await this.setState({ page: page + 1, });
//         this.updateNews();
//     }


//     render() {
//         return (
//             <div className='container my-3 flex-col'>

//                 {loading && <CircularIndeterminate />}

//                 {!loading && <h3 className='text-center'> {this.capitalizeFirstLetter(props.category)}  - Trending Now</h3>}

//                 <div className="row">
//                     {!loading && articles.map((element) => {
//                         return <div className="col-md-4" key={element.url}>
//                             <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date={new Date(element.publishedAt).toGMTString()} />
//                         </div>
//                     })}
//                 </div>
//                 <div className="container d-flex justify-content-around my-5">
//                     <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
//                     <button disabled={(page + 1) > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
//                 </div>
//             </div>
//         )
//     }
// }

// export default News




// ----------BELOW IMPLEMENTATION OF NEWS COMPONENT USES INFINITE SCROLL COMPONENTS AND ABOVE CODE IS USING NEXT/PREVIOUS BUTTONS -------//


import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import CircularIndeterminate from './CircularIndeterminate';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    //defining states
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setpage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    //function to Capitalize
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //updateNews for the first time
    const updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        props.setProgress(10);
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    //loads the data for the first time only
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - VigyaNews`;
        updateNews();
        // eslint-disable-next-line     
    }, [])



    //fetching data for infinite scroll
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setpage(page + 1);
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    };

    return (
        <>
            {loading && <CircularIndeterminate />}
            <h3 className='text-center' style={{marginTop:'90px'}}> {capitalizeFirstLetter(props.category)}  - Trending Now</h3>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={loading && <CircularIndeterminate />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element, index) => {
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

News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
    apiKey: ""
}
News.propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string,
}

export default News




