import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {  
  
  constructor(props) {
    super(props);
    this.state = {
      weatherResult:[1,2,3],
      searchQuery: '',
      searchMovie: '',
      moviesResult: [1,2,3]
    }
  }

  getWeather = async (body) =>{

    await this.setState({
      searchQuery:document.getElementById('searchBox').value
    })

    console.log(this.state.searchQuery)

    try{    
      let url = `http://localhost:3001/weather/${this.state.searchQuery}`;
      let data = await axios.get(url);
      console.log(data.data)
      this.setState({
        weatherResult: data.data,
      })
      
    } catch{
      console.log("error: Something went wrong.")
    }
  }


  getMovies = async (body) =>{

    await this.setState({
      searchMovie:document.getElementById('searchMovies').value
    })

    console.log(this.state.searchMovie)

    try{    
      let url = `https://api.themoviedb.org/3/search/movie?api_key=7a740dd8ac17d5f2ee9d56f3f2329d97&query=${this.state.searchMovie}`
      let data = await axios.get(url);
      console.log(data.data.results)
      let movies = data.data.results
      movies.map((item)=>{
        item.backdrop_path = `https://image.tmdb.org/t/p/original/${item.backdrop_path}`
      })


      this.setState({
        moviesResult:movies,
      })
      
    } catch{
      console.log("error: Something went wrong.")
    }
  }
 

  render() {
    return (
      <div>
        <p></p>
        <section class="vh-100">
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-md-8 col-lg-6 col-xl-4 m-2">
                <h3 class="mb-4 pb-2 fw-normal">Check the weather forecast</h3>

                <div class="input-group rounded mb-3">
                  <input type="search" class="form-control rounded" placeholder="City" aria-label="Search"
                    aria-describedby="search-addon" id="searchBox" />
                  <a href="#!" type="button" onClick={this.getWeather.bind(this)}>
                    <span class="input-group-text border-0 fw-bold" id="search-addon">
                      Check!
                    </span>
                  </a>
                </div>

                <div class="row-fluid">
                <p>City: {this.state.weatherResult[0].city_name}</p>
                <p>Longitude: {this.state.weatherResult[0].lon }</p>
                <p>Latitude: {this.state.weatherResult[0].lat}</p>
                </div>
                </div>

                <div class="card-deck shadow-0 border">
                  <div class="card-body p-4">
                    <h4 class="mb-1 sfw-normal">{this.state.weatherResult[0].city_name}</h4>
                    <p class="mb-2">Date: <strong>{this.state.weatherResult[0].date}</strong></p>

                    <p>Feels like: <strong>---</strong></p>
                    <p>Max: <strong>{this.state.weatherResult[0].high_temp}°C</strong>, Min: <strong>{this.state.weatherResult[0].low_temp}°C</strong></p>

                    <div class="d-flex flex-row align-items-center">
                      <p class="mb-0 me-4">{this.state.weatherResult[0].description}</p>
                    </div>
                  </div>

                  <div class="card-body p-4">
                    <h4 class="mb-1 sfw-normal">{this.state.weatherResult[1].city_name}</h4>
                    <p class="mb-2">Date: <strong>{this.state.weatherResult[1].date}</strong></p>

                    <p>Feels like: <strong>---</strong></p>
                    <p>Max: <strong>{this.state.weatherResult[1].high_temp}°C</strong>, Min: <strong>{this.state.weatherResult[1].low_temp}°C</strong></p>

                    <div class="d-flex flex-row align-items-center">
                      <p class="mb-0 me-4">{this.state.weatherResult[1].description}</p>
                    </div>
                  </div>

                  <div class="card-body p-4">
                    <h4 class="mb-1 sfw-normal">{this.state.weatherResult[2].city_name}</h4>
                    <p class="mb-2">Date: <strong>{this.state.weatherResult[2].date}</strong></p>

                    <p>Feels like: <strong>---</strong></p>
                    <p>Max: <strong>{this.state.weatherResult[2].high_temp}°C</strong>, Min: <strong>{this.state.weatherResult[2].low_temp}°C</strong></p>

                    <div class="d-flex flex-row align-items-center">
                      <p class="mb-0 me-4">{this.state.weatherResult[2].description}</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>


        <section class="vh-100">
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-md-8 col-lg-6 col-xl-4 m-2">
                <h3 class="mb-4 pb-2 fw-normal">Search Movies</h3>

                <div class="input-group rounded mb-3">
                  <input type="search" class="form-control rounded" placeholder="Movie" aria-label="Search"
                    aria-describedby="search-addon" id="searchMovies" />
                  <a href="#!" type="button" onClick={this.getMovies.bind(this)}>
                    <span class="input-group-text border-0 fw-bold" id="search-addon">
                      Search!
                    </span>
                  </a>
                </div>
                </div>

                <div class="card-deck">
                  <div class="card">
                    <img class="card-img-top" src={this.state.moviesResult[0].backdrop_path} alt="Card image cap"/>
                    <div class="card-body">
                      <h5 class="card-title">{this.state.moviesResult[0].title}</h5>
                      <p class="card-text">{this.state.moviesResult[0].overview}</p>
                      <p class="card-text"><strong>Vote Average</strong> {this.state.moviesResult[0].vote_average}</p>
                      <p class="card-text"><strong>Total Vote</strong> {this.state.moviesResult[0].vote_count}</p>
                    </div>
                    <div class="card-footer">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                  </div>
                  <div class="card">
                    <img class="card-img-top" src={this.state.moviesResult[1].backdrop_path} alt="Card image cap"/>
                    <div class="card-body">
                      <h5 class="card-title">{this.state.moviesResult[1].title}</h5>
                      <p class="card-text">{this.state.moviesResult[1].overview}</p>
                      <p class="card-text"><strong>Vote Average</strong> {this.state.moviesResult[1].vote_average}</p>
                      <p class="card-text"><strong>Total Vote</strong> {this.state.moviesResult[1].vote_count}</p>
                    </div>
                    <div class="card-footer">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                  </div>
                  <div class="card">
                    <img class="card-img-top" src={this.state.moviesResult[2].backdrop_path} alt="Card image cap"/>
                    <div class="card-body">
                      <h5 class="card-title">{this.state.moviesResult[2].title}</h5>
                      <p class="card-text">{this.state.moviesResult[2].overview}</p>
                      <p class="card-text"><strong>Vote Average</strong> {this.state.moviesResult[2].vote_average}</p>
                      <p class="card-text"><strong>Total Vote</strong> {this.state.moviesResult[2].vote_count}</p>
                    </div>
                    <div class="card-footer">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                  </div>
                </div>


            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default App;