import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

//import Spinner from "./spinner";

export class News extends Component {
  // articles = [
  //   {
  //     source: {
  //       id: "espn-cric-info",
  //       name: "ESPN Cric Info",
  //     },
  //     author: null,
  //     title:
  //       "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     description:
  //       "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     urlToImage:
  //       "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     publishedAt: "2020-04-27T11:41:47Z",
  //     content:
  //       "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
  //   },
  //   {
  //     source: {
  //       id: "espn-cric-info",
  //       name: "ESPN Cric Info",
  //     },
  //     author: null,
  //     title:
  //       "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     description:
  //       "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     urlToImage:
  //       "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     publishedAt: "2020-03-30T15:26:05Z",
  //     content:
  //       "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
  //   },
  // ];

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "sports",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("Hello I am from the news component");
    this.state = {
      //articles: this.articles,
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };

    document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?q=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apiKey}&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let response = await fetch(url);
    let data = await response.json();

    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false,
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url =
    //   `https://newsapi.org/v2/top-headlines?q=${this.props.country}&category=${this.props.category}&apiKey=893643d584a141d19fb1f6d18584a131&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let response = await fetch(url);
    // let data = await response.json();
    // console.log(data);
    // this.setState({ articles: data.articles, totalResults : data.totalResults, loading: false });

    this.updateNews();
  }

  // handlePreviousClick = async () => {
  //   // console.log("previous");
  //   // console.log("next");
  //   // let url =
  //   // `https://newsapi.org/v2/top-headlines?q=${this.props.country}&category=${this.props.category}&apiKey=893643d584a141d19fb1f6d18584a131&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let response = await fetch(url);
  //   // let data = await response.json();

  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles : data.articles,
  //   //   loading: false
  //   // })

  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };

  // handleNextClick = async () => {
  //   // console.log("next");
  //   // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
  //   // {
  //   //   let url =
  //   //   `https://newsapi.org/v2/top-headlines?q=${this.props.country}&category=${this.props.category}&apiKey=893643d584a141d19fb1f6d18584a131&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   //   this.setState({loading:true});
  //   //   let response = await fetch(url);
  //   //   let data = await response.json();

  //   //   this.setState({
  //   //     page: this.state.page + 1,
  //   //     articles : data.articles,
  //   //     loading: false
  //   //   })
  //   // }

  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?q=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
      loading: false,
    });
  };

  render() {
    return (
     <>
        <h2 className="text-center" style={{ margin: "40px 0px" }}>
          NewsMonkey - Top {this.capitalize(this.props.category)} Headlines
        </h2>
        {this.state.loading && <Spinner/>} 
        <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {/* !this.state.loading &&  */}
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-3" key={element.url}>
                    <NewsItem
                      title={
                        element.title != null ? element.title.slice(0, 45) : " "
                      }
                      description={
                        element.description != null
                          ? element.description.slice(0, 88)
                          : "eBay adds an AI-powered 'shop the look' feature to its iOS app - Yahoo Finance Australia"
                      }
                      imageUrl={
                        element.urlToImage != null
                          ? element.urlToImage
                          : "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/1280C/production/_133088757_whatsubject.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
        </>
    );
  }
}

export default News;
