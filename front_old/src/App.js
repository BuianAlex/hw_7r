import React from 'react';
import './App.css';
import Header from './components/header/header';
import siteData from './siteData';
import Services from './components/services/services';
import About from './components/about/about';
import Team from './components/team/team';
import Clients from './components/clients/clients';
import Comments from './components/comments/comments';
import Footer from './components/footer/footer';

class App extends React.Component {
  constructor() {
    super();
    this.data = siteData;
  }

  render() {
    return (
      <div className="App">
        {/* <Header></Header>
        <Services srvData={this.data.services}></Services>
        <About></About>
        <Team teamData={this.data.team}></Team>
        <Clients clientsData={this.data.clients}></Clients> */}
        <Comments></Comments>
        {/* <Footer></Footer> */}
      </div>
    );
  }
}

export default App;
