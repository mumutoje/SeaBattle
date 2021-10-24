import React from 'react';
import '../CSS/App.css';
import Hit from '../Assets/Hit.png';
import Miss from '../Assets/Miss.png';
import Empty from '../Assets/Empty.png';


class Cell extends React.Component {

    handleClick = () => {
       this.props.checkHit(this.props.Id);
    }

    renderCross() {

       if (this.props.activeCells[this.props.Id] === true ){
            return (
                <img className="Cross" src={Empty} alt="Empty"/>
            );
       }

       else if (this.props.activeCells[this.props.Id] === false && Boolean(this.props.occupiedCells[this.props.Id]) === true) {
            return (
                <img className="Cross" src={Hit} alt="Hit"/>
            );
       }

       else if (this.props.activeCells[this.props.Id] === false && this.props.occupiedCells[this.props.Id] === false) {
            return (
                <img className="Cross" src={Miss} alt="Miss"/>
            );
       }
    }


    render() {
        return (
            <button className="Cell" onClick ={this.handleClick}>{this.renderCross()}</button>
        );
    }
}

export default Cell;