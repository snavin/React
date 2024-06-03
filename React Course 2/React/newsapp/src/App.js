import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  //c= 'John';
  pageSize = 6;
  apiKey=process.env.REACT_APP_NEWS_API//process;

  state= {
    progress: 0
  }

  setProgress=(progress) => {
      this.setState({progress:progress})
   }

  
  render() {
    return (
      <div>
        {/* hello this is {this.c} */}
        <BrowserRouter>
          <LoadingBar color="#f11946" progress={this.state.progress}/>
          <Navbar />
          <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} 
                apiKey={this.apiKey} key="politics" pageSize={this.pageSize} category="politics" country="india" />
            } />
            <Route exact path="/politics" element={<News setProgress={this.setProgress} 
                apiKey={this.apiKey} key="politics" pageSize={this.pageSize} category="politics" country="india" />
            } />
            <Route exact path="/health" element={   <News setProgress={this.setProgress}  apiKey={this.apiKey} pageSize={this.pageSize} key="health" category="health" country="india"
                />
              }
            />
            <Route
              exact
              path="/general"
              element={
                <News setProgress={this.setProgress} apiKey={this.apiKey}
                  pageSize={this.pageSize}
                  key="general"
                  category="general"
                  country="india"
                />
              }
            />
            <Route exact path="/science"   element={<News setProgress={this.setProgress} key="science"   apiKey={this.apiKey} pageSize={5} category="science" country="india"/>}/>
            <Route
              exact
              path="/sports"
              element={
                <News setProgress={this.setProgress} apiKey={this.apiKey}
                  pageSize={this.pageSize}
                  key="sports"
                  category="sports"
                  country="india"
                  
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News setProgress={this.setProgress} apiKey={this.apiKey}
                  pageSize={this.pageSize}
                  key="technology"
                  category="technology"
                  country="us"
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
