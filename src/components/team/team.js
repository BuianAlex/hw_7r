import React from 'react';
import './team.scss';

class Team extends React.Component {
  render() {
    return (
      <section className="team-section">
        <div className="container">
          <hr></hr>
          <h3>Our team</h3>
          <ul className="team-list">
            {this.props.teamData.map(item => {
              return (
                <li>
                  <div className="img-wraper">
                    <img src={'./img/' + item.img} alt="Kevin-Mitnick" />
                  </div>
                  <p className="member-name">{item.name}</p>
                  <p className="member-position">{item.position}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
}

export default Team;
