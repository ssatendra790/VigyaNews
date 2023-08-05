import React, { Component } from 'react'
import NewsItem from './NewsItem'
import CircularIndeterminate from './CircularIndeterminate';

export class News extends Component {
    constructor(){
        super();
        this.state ={
            articles: [],
            loading: true,
            page:1,
            totalResults: 0,
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/everything?q=in&apiKey=ba6a9fff6e87435c89487f2b6ab08fc6&page=1&pageSize=${this.props.pageSize}`;
        
        this.setState({loading: true});

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
    }

    handlePrevClick =  async() =>{
        let url = `https://newsapi.org/v2/everything?q=in&apiKey=ba6a9fff6e87435c89487f2b6ab08fc6&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;

        this.setState({loading: true});

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false,
        });
    }

    handleNextClick = async() => {

        if((this.state.page + 1) <= Math.ceil(this.state.totalResults/this.props.pageSize)){
            console.log(this.state.totalResults)
            let url = `https://newsapi.org/v2/everything?q=in&apiKey=ba6a9fff6e87435c89487f2b6ab08fc6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

            this.setState({loading: true});

            let data = await fetch(url);
            let parsedData = await data.json();

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false,
            });

        } 
    }
    

  render() {
    return (
      <div className='container my-3 flex-col'>

        {this.state.loading && <CircularIndeterminate/>}

        {!this.state.loading && <h3 className='text-center'>Trending News</h3>}

        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-3" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/> 
                </div>
            })}
        </div>
        <div className="container d-flex justify-content-around my-5">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page >= 9} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>  
      </div>
    )
  }
}

export default News




