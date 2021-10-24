import React from 'react';
import '../CSS/App.css';

class ResTable extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.NumHits === 17) {
            this.props.gameOver();
        }
    }

    renderHitsSpace = () => {
        return (
            <div className="HitsSpace">
                <h1>{this.props.NumHits}</h1>
                <hr/>
                <p className="Label">Hits</p>
            </div>
        );
    }

    renderShotsSpace = () => {
        return (
            <div className="ShotsSpace">
                <h1>{this.props.NumShots}</h1>
                <hr/>
                <p className="Label">Shots</p>
            </div>
        );
    }

    render() {

        return (
            <div className="ResRow">
                {this.renderHitsSpace()}
                {this.renderShotsSpace()}
            </div>
        );
    }
}

export default ResTable;