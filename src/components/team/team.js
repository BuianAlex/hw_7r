import React from 'react';
import './team.scss';

class Team extends React.Component {
  render() {
    return (
      <section className="team-section">
        <div className="container">
          <hr></hr>
          <h2>Our team</h2>
          <ul className="team-list flex-wrap">
            {this.props.teamData.map(item => {
              return (
                <li key={item.id} className="col-4">
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
