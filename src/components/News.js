import React, { Component } from 'react'
import NewsItem from './NewsItem'


export class News extends Component {
    constructor(){
        super();
        this.state ={
            articles: [],
            loading: false,
            page:1,
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/everything?q=in&apiKey=0c55548f8440447695ba41cebe9556b3&page=1&pageSize=28";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        })
    }

    handlePrevClick =  async() =>{
        console.log("prev")
        let url = `https://newsapi.org/v2/everything?q=in&apiKey=0c55548f8440447695ba41cebe9556b3&page=${this.state.page - 1}&pageSize=28`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    handleNextClick = async() => {
        console.log("next")
        if((this.state.page + 1) <= Math.ceil((this.state.totalResults)/28)){
            console.log(this.state.totalResults)
            let url = `https://newsapi.org/v2/everything?q=in&apiKey=0c55548f8440447695ba41cebe9556b3&page=${this.state.page + 1}&pageSize=28`;
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        } 
    }
    

  render() {
    return (
      <div className='container my-3 flex-col'>
        <h3>VigyaNews</h3>

        <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-3" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/> 
                </div>
            })}
        </div>
        <div className="container d-flex justify-content-around my-5">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={(this.state.page) >= 3} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
