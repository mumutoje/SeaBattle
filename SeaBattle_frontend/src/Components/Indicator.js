import React from 'react';
import '../CSS/App.css';
import HitSmall from '../Assets/Hit small.png';
import MissSmall from '../Assets/Miss small.png';

class Indicator extends React.Component{

    createList = (number) => {
       let array = [];
       for (let i = 1; i <= number; i++){
           array.push(i);
       }
       return array;
    }

    renderInd = () => {

        let statusList = this.createList(this.props.Health);

        if (this.props.Size === 0){

            return (
                <div className = "IndicatorsList">
                    {statusList.map(i => (
                        <img key ={`m${i}`} className="Indicator" src={HitSmall} alt="MissSmall"/>
                        ))}
                </div>
            );

        } else {
            return (
                <div className = "IndicatorsList">
                    {statusList.map(i => (
                        <img key ={`m${i}`} className="Indicator" src={MissSmall} alt="MissSmall"/>
                    ))}
                </div>
            );
        }
    }

    render() {
        return (
            this.renderInd()
        );
    }
}

export default Indicator;