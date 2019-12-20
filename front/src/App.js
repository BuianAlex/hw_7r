import React from 'react';
import './App.css';
import Header from './components/header/header';
import siteData from './data/siteData';
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
       <Header/>
        <Services srvData={this.data.services}/>
        <About/>
        <Team teamData={this.data.team}/>
        <Clients clientsData={this.data.clients}/> 
        <Comments/>
        <Footer map={this.data.gmKey}/>
      </div>
    );
  }
}

export default App;
