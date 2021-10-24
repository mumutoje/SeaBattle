import React from 'react';
import '../CSS/App.css';
import Cell from './Cell';

class Battlefield extends React.Component {

    renderCellRow(y) {
        const RenderList = [0, 1, 2, 3, 4 ,5 ,6 ,7 ,8 ,9];
        return (
        <div key={y} className="CellRow">
            {RenderList.map(x => (
                <Cell
                    key={`[${y},${x}]`}
                    Id = {parseInt(`${y}${x}`)}
                    userHits = {this.props.userHits}
                    checkHit = {this.props.checkHit}
                    activeCells = {this.props.activeCells}
                    occupiedCells = {this.props.occupiedCells}
                />
            ))}
        </div>
        );
    }

    render() {
        const RenderList = [0, 1, 2, 3, 4 ,5 ,6 ,7 ,8 ,9];
        return (
            <div className="Battlefield">
                {RenderList.map(y => (
                this.renderCellRow(y)
                ))}
            </div>
        );
    }
}

export default Battlefield;