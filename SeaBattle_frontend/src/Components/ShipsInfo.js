import React from 'react';
import '../CSS/App.css';
import Carrier from '../Assets/Carrier Shape.png';
import Battleship from '../Assets/Battleship Shape.png';
import Cruiser from '../Assets/Cruiser Shape.png';
import Submarine from '../Assets/Submarine Shape.png';
import Destroyer from '../Assets/Destroyer Shape.png';
import Indicator from './Indicator';


class ShipsInfo extends React.Component {

    renderCarrierIndicator = () => {

        return (
            <Indicator
                Size = {this.props.carrierSize}
                Health = {this.props.carrierHealth}
            />
        );
    }

    renderBattleshipIndicator = () => {

        return (
            <Indicator
                Size = {this.props.battleshipSize}
                Health = {this.props.battleshipHealth}
            />
        );
    }

    renderCruiserIndicator = () => {

        return (
            <Indicator
                Size = {this.props.cruiserSize}
                Health = {this.props.cruiserHealth}
            />
        );
    }

    renderSubmarineIndicator = () => {

        return (
            <Indicator
                Size = {this.props.submarineSize}
                Health = {this.props.submarineHealth}
            />
        );
    }

    renderDestroyerIndicator = () => {

        return (
            <Indicator
                Size = {this.props.destroyerSize}
                Health = {this.props.destroyerHealth}
            />
        );
    }

    render () {
        return (
            <div className="BottomTable">
                <div className ="LeftColumn">
                    <div className="ShipInfo">
                        <img className ="Ship" src={Carrier} alt="Carrier"/>
                        {this.renderCarrierIndicator()}
                    </div>

                    <div className="ShipInfo">
                        <img className ="Ship" src={Battleship} alt="Battleship"/>
                        {this.renderBattleshipIndicator()}
                    </div>

                    <div className="ShipInfo">
                        <img className ="Ship" src={Cruiser} alt="Cruiser"/>
                        {this.renderCruiserIndicator()}
                    </div>
                </div>

                <div className ="RightColumn">
                    <div className="ShipInfo">
                        <img className ="Ship" src={Submarine} alt="Submarine"/>
                        {this.renderSubmarineIndicator()}
                    </div>

                    <div className="ShipInfo">
                        <img className ="Ship" src={Destroyer} alt="Destroyer"/>
                        {this.renderDestroyerIndicator()}
                    </div>
                </div>
            </div>
        );
    }
}

export default ShipsInfo;