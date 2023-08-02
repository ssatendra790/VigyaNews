import React, { Component } from 'react'
import NewsItem from './NewsItem'


export class News extends Component {
    constructor(){
        super();
        this.state ={
            articles: [],
            loading: false,
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=0c55548f8440447695ba41cebe9556b3";
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles})
    }

    handlePrevClick =  async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0c55548f8440447695ba41cebe9556b3&page-${this.state.page - 1}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
    }

    handleNextClick = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0c55548f8440447695ba41cebe9556b3&page-${this.state.page + 1}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles
        })
    }
    

  render() {
    return (
      <div className='container my-3'>
        <h2>VigyaNews - Top Headlines</h2>

        <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/> 
                </div>
            })}
        </div>
        <div className="container d-flex justify-content-center my-5">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-2" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type="button" className="btn btn-dark mx-2" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
