import React from 'react';
import '../CSS/App.css';

class Header extends React.Component {

    render() {
        return (
        <header>
            <div className = "Header">
                    <button className = "NewGame" onClick={this.props.NewGame}>{this.props.changeButtonName()}</button>
                    <input className = "InputRow" type="text" placeholder="Your name:" maxLength="10" onChange={this.props.onChange} value={this.props.Name} />
                    <button className = "Records" onClick={this.props.Records}>Records</button>
            </div>
        </header>
        );
    }
}

export default Header;