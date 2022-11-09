import "./App.css";

import React, { Component } from "react";

let link1 =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=999a027a1f944c04b2b07562a8623400";
export default class App extends Component {
  state = {
    berita: [],
    cari: "",
  };
  berita = (input) => {
    fetch(input)
      .then((response) => response.json())
      .then((data) => this.setState({ berita: data.articles }));
  };

  handleChange = (e) => {
    this.setState({ cari: e.target.value });
  };

  render() {
    return (
      <div>
        <form>
          <input
            id="cari"
            className="search"
            type="search"
            placeholder="Cari..."
            onChange={this.handleChange}
          />
          <input className="button mb-4 mt-3" type="button" value="Cari" />
        </form>

        <div className="container">
          <div className="row">
            {this.state.berita
              ? this.state.berita.map((item, index) => {
                  return (
                    <div className="col-12	col-lg-6	col-xl-4	">
                      <div className="card" style={{ width: "18rem" }}>
                        <img
                          className="card-img-top"
                          src={item.urlToImage}
                          alt={item.title}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text">{item.author}</p>
                          <p className="card-text">{item.description}</p>
                          <a href={item.url} className="btn btn-primary">
                            {" "}
                            Selengkapnya{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.berita(link1);
  }
  componentDidUpdate(prevProps, prevState) {
    let link2 = `https://newsapi.org/v2/everything?q=${this.state.cari}&apiKey=999a027a1f944c04b2b07562a8623400`;
    if (this.state.cari !== prevState.cari) {
      this.berita(link2);
    }
  }
}
