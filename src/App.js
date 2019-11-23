import React from 'react';
import './App.css';
import Header from './components/header/header';
import Services from './components/services/services';
import About from './components/about/about';
import Team from './components/team/team';
import Clients from './components/clients/clients';
import Footer from './components/footer/footer';

class App extends React.Component {
  constructor() {
    super();
    this.data = {
      services: [
        {
          id: 1,
          icon: 'backup.svg',
          name: 'Data backup services',
          description: `Lorem ipsum dolor sit amet, 
                         consectetur adipiscing elit. 
                         Nunc a elit posuere nisi mattis 
                         fermentum. Aenean faucibus metus a
                         lorem pulvinar condimentum. Nam nec 
                         fermentum augue, vel fringilla augue.
                          Praesent blandit fermentum vestibulum. 
                          Pellentesque aliquet iaculis velit. 
                          Vivamus a purus maximus, posuere tortor 
                          faucibus, accumsan velit. Nulla at 
                          sollicitudin augue. 
                          Curabitur sapien velit, 
                          aliquam eu malesuada quis, 
                          ullamcorper sit amet lectus. 
                          Phasellus tristique lacus in nisl
                          convallis tincidunt. In id mollis elit. Duis 
                          vulputate lacus vel massa sodales pretium. Proin 
                          pulvinar, turpis in euismod pellentesque, eros 
                          felis lacinia nulla, nec vehicula lectus orci 
                          quis ante. Sed tincidunt gravida purus, 
                          non consequat arcu pulvinar sed. Vivamus 
                          malesuada arcu lorem, bibendum volutpat 
                          velit bibendum posuere. Sed ultrices 
                          purus sed nunc auctor, sit amet dictum 
                          nulla pharetra. Donec interdum nulla 
                          hendrerit ex tincidunt mollis.`
        },
        {
          id: 2,
          icon: 'remote-access.svg',
          name: 'Remote access services',
          description: `Lorem ipsum dolor sit amet, 
                         consectetur adipiscing elit. 
                         Nunc a elit posuere nisi mattis 
                         fermentum. Aenean faucibus metus a
                         lorem pulvinar condimentum. Nam nec 
                         fermentum augue, vel fringilla augue.
                          Praesent blandit fermentum vestibulum. 
                          Pellentesque aliquet iaculis velit. 
                          Vivamus a purus maximus, posuere tortor 
                          faucibus, accumsan velit. Nulla at 
                          sollicitudin augue. 
                          Curabitur sapien velit, 
                          aliquam eu malesuada quis, 
                          ullamcorper sit amet lectus. 
                          Phasellus tristique lacus in nisl
                          convallis tincidunt. In id mollis elit. Duis 
                          vulputate lacus vel massa sodales pretium. Proin 
                          pulvinar, turpis in euismod pellentesque, eros 
                          felis lacinia nulla, nec vehicula lectus orci 
                          quis ante. Sed tincidunt gravida purus, 
                          non consequat arcu pulvinar sed. Vivamus 
                          malesuada arcu lorem, bibendum volutpat 
                          velit bibendum posuere. Sed ultrices 
                          purus sed nunc auctor, sit amet dictum 
                          nulla pharetra. Donec interdum nulla 
                          hendrerit ex tincidunt mollis.`
        },
        {
          id: 3,
          icon: 'computer.svg',
          name: 'Custom built desktops, laptops and servers',
          description: `Lorem ipsum dolor sit amet, 
                         consectetur adipiscing elit. 
                         Nunc a elit posuere nisi mattis 
                         fermentum. Aenean faucibus metus a
                         lorem pulvinar condimentum. Nam nec 
                         fermentum augue, vel fringilla augue.
                          Praesent blandit fermentum vestibulum. 
                          Pellentesque aliquet iaculis velit. 
                          Vivamus a purus maximus, posuere tortor 
                          faucibus, accumsan velit. Nulla at 
                          sollicitudin augue. 
                          Curabitur sapien velit, 
                          aliquam eu malesuada quis, 
                          ullamcorper sit amet lectus. 
                          Phasellus tristique lacus in nisl
                          convallis tincidunt. In id mollis elit. Duis 
                          vulputate lacus vel massa sodales pretium. Proin 
                          pulvinar, turpis in euismod pellentesque, eros 
                          felis lacinia nulla, nec vehicula lectus orci 
                          quis ante. Sed tincidunt gravida purus, 
                          non consequat arcu pulvinar sed. Vivamus 
                          malesuada arcu lorem, bibendum volutpat 
                          velit bibendum posuere. Sed ultrices 
                          purus sed nunc auctor, sit amet dictum 
                          nulla pharetra. Donec interdum nulla 
                          hendrerit ex tincidunt mollis.`
        },
        {
          id: 4,
          icon: 'network.svg',
          name: 'Wide area network services',
          description: `Lorem ipsum dolor sit amet, 
                         consectetur adipiscing elit. 
                         Nunc a elit posuere nisi mattis 
                         fermentum. Aenean faucibus metus a
                         lorem pulvinar condimentum. Nam nec 
                         fermentum augue, vel fringilla augue.
                          Praesent blandit fermentum vestibulum. 
                          Pellentesque aliquet iaculis velit. 
                          Vivamus a purus maximus, posuere tortor 
                          faucibus, accumsan velit. Nulla at 
                          sollicitudin augue. 
                          Curabitur sapien velit, 
                          aliquam eu malesuada quis, 
                          ullamcorper sit amet lectus. 
                          Phasellus tristique lacus in nisl
                          convallis tincidunt. In id mollis elit. Duis 
                          vulputate lacus vel massa sodales pretium. Proin 
                          pulvinar, turpis in euismod pellentesque, eros 
                          felis lacinia nulla, nec vehicula lectus orci 
                          quis ante. Sed tincidunt gravida purus, 
                          non consequat arcu pulvinar sed. Vivamus 
                          malesuada arcu lorem, bibendum volutpat 
                          velit bibendum posuere. Sed ultrices 
                          purus sed nunc auctor, sit amet dictum 
                          nulla pharetra. Donec interdum nulla 
                          hendrerit ex tincidunt mollis.`
        },
        {
          id: 5,
          icon: 'technical-support.svg',
          name: 'Computer repair services',
          description: `Lorem ipsum dolor sit amet, 
                         consectetur adipiscing elit. 
                         Nunc a elit posuere nisi mattis 
                         fermentum. Aenean faucibus metus a
                         lorem pulvinar condimentum. Nam nec 
                         fermentum augue, vel fringilla augue.
                          Praesent blandit fermentum vestibulum. 
                          Pellentesque aliquet iaculis velit. 
                          Vivamus a purus maximus, posuere tortor 
                          faucibus, accumsan velit. Nulla at 
                          sollicitudin augue. 
                          Curabitur sapien velit, 
                          aliquam eu malesuada quis, 
                          ullamcorper sit amet lectus. 
                          Phasellus tristique lacus in nisl
                          convallis tincidunt. In id mollis elit. Duis 
                          vulputate lacus vel massa sodales pretium. Proin 
                          pulvinar, turpis in euismod pellentesque, eros 
                          felis lacinia nulla, nec vehicula lectus orci 
                          quis ante. Sed tincidunt gravida purus, 
                          non consequat arcu pulvinar sed. Vivamus 
                          malesuada arcu lorem, bibendum volutpat 
                          velit bibendum posuere. Sed ultrices 
                          purus sed nunc auctor, sit amet dictum 
                          nulla pharetra. Donec interdum nulla 
                          hendrerit ex tincidunt mollis.`
        },
        {
          id: 6,
          icon: 'cyber-security.svg',
          name: 'Cyber security',
          description: `Lorem ipsum dolor sit amet, 
                         consectetur adipiscing elit. 
                         Nunc a elit posuere nisi mattis 
                         fermentum. Aenean faucibus metus a
                         lorem pulvinar condimentum. Nam nec 
                         fermentum augue, vel fringilla augue.
                          Praesent blandit fermentum vestibulum. 
                          Pellentesque aliquet iaculis velit. 
                          Vivamus a purus maximus, posuere tortor 
                          faucibus, accumsan velit. Nulla at 
                          sollicitudin augue. 
                          Curabitur sapien velit, 
                          aliquam eu malesuada quis, 
                          ullamcorper sit amet lectus. 
                          Phasellus tristique lacus in nisl
                          convallis tincidunt. In id mollis elit. Duis 
                          vulputate lacus vel massa sodales pretium. Proin 
                          pulvinar, turpis in euismod pellentesque, eros 
                          felis lacinia nulla, nec vehicula lectus orci 
                          quis ante. Sed tincidunt gravida purus, 
                          non consequat arcu pulvinar sed. Vivamus 
                          malesuada arcu lorem, bibendum volutpat 
                          velit bibendum posuere. Sed ultrices 
                          purus sed nunc auctor, sit amet dictum 
                          nulla pharetra. Donec interdum nulla 
                          hendrerit ex tincidunt mollis.`
        }
      ],
      team: [
        {
          id: 1,
          img: 'Kevin-Mitnick.jpg',
          name: 'Kevin Mitnick',
          position: 'Founder & CEO'
        },
        {
          id: 2,
          img: 'julian.png',
          name: 'Julian Assange',
          position: 'Technical  Lead'
        },
        {
          id: 3,
          img: 'mckinnon.jpg',
          name: 'Gary McKinnon',
          position: 'Cyber security engineer'
        },
        {
          id: 4,
          img: 'calce.jpg',
          name: 'Michael Calce',
          position: 'Network engineer'
        }
      ],
      clients: [
        {
          id: 1,
          name: 'ebay',
          img: 'EBay_logo.svg.webp'
        },
        {
          id: 2,
          name: 'yahoo',
          img: 'yahoo.png'
        },
        {
          id: 3,
          name: 'CNN',
          img: 'CNN.svg'
        },
        {
          id: 4,
          name: 'Dell',
          img: 'Dell_Logo.svg'
        },
        {
          id: 5,
          name: 'Amazon',
          img: 'Amazon_logo.png'
        },
        {
          id: 6,
          name: 'nasa',
          img: 'nasa.png'
        },
        {
          id: 7,
          name: 'United_States_Department_of_Defense_Seal',
          img: 'United_States_Department_of_Defense_Seal.svg.png'
        }
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <Services srvData={this.data.services}></Services>
        <About></About>
        <Team teamData={this.data.team}></Team>
        <Clients clientsData={this.data.clients}></Clients>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;

// • Data recovery services
// • Out sourced IT services
// • Remote access services
// • Custom built desktops, laptops and servers
// • Data recovery services
// • Wide area network services
// • Computer repair services
// • Ongoing scheduled maintenance services
