import React, { Component } from "react";
import "./styles.css"; 

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl,newsUrl,author, date,source } = this.props;

    return (
      
      <div className="news-card-container" >
        <div className="card" >
          <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right:0}}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">Last updated By {author!= null ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noopener noreferrer"  target="_blank" className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
