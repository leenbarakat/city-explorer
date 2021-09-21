import React from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      imgUrl: '',
      locationResult: {},
      searchQuery: ''
    }
    
  }

  getLocFun = async (e) => {
    e.preventDefault();
    console.log('inside getLocFun')

    await this.setState({
      searchQuery: e.target.city.value
    })

    console.log('key',process.env.REACT_APP_LOCATIONIQ_KEY);


    let reqUrl = ` https://eu1.locationiq.com/v1/search.php?key=pk.de44a9504016551ea3a0451181157fb2&q=${this.state.searchQuery}&format=json`
    
    let locResult = await axios.get(reqUrl);
    console.log('hey',locResult);
    console.log('hello', locResult.data);
    console.log('hi', locResult.data[0]);

    this.setState({
      locationResult:locResult.data[0]
    })

    let imgUrl=`https://maps.locationiq.com/v3/staticmap?key=pk.de44a9504016551ea3a0451181157fb2&center=${this.state.locationResult.lat},${this.state.locationResult.lon}&zoom=8`
    this.setState({imgUrl:imgUrl})
  
  }
  
  render() {
    return (
      <div>
        <h3>City Explorer app</h3>
       {/* <button onClick={this.getLocFun}>Get Location</button >*/}
        <form onSubmit={this.getLocFun}>
          <input type = "text" name = 'city'/>
          <input type = "submit" value = 'click to find a city'/>
          </form>
        
        <p>City Name: {this.state.searchQuery}</p>
        <p>latitude: {this.state.locationResult.lat} </p>
        <p>longtitude: {this.state.locationResult.lon} </p>



        <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={this.state.imgUrl} />
  <Card.Body>
    <Card.Title>{this.state.searchQuery}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
      </div>


    )
  }
}
export default App;