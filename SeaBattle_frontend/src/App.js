import React from 'react';
import './CSS/App.css';
import Battlefield from './Components/Battlefield';
import Header from './Components/Header';
import ShipsInfo from './Components/ShipsInfo';
import ResTable from './Components/ResTable';
import SandGlass from './Assets/SandGlass.png';


const url_shiptypes = "http://localhost:6811/api/shiptypes";
const url_users = "http://localhost:6811/api/users";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            records : undefined,
            nameChanged : false,
            buttonIsClicked : false,

            activeCells : Array(100).fill(true),
            occupiedCells : Array(100).fill(false),

            renderMode : "Hint",
            serverError : false,

            userId : undefined,
            userName : "",
            userHits : 0,
            userShots: 0,

            carrierSize : undefined,
            carrierHealth: undefined,

            battleshipSize : undefined,
            battleshipHealth: undefined,

            cruiserSize : undefined,
            cruiserHealth: undefined,

            submarineSize : undefined,
            submarineHealth: undefined,

            destroyerSize : undefined,
            destroyerHealth: undefined,

        };
    }

    ListOfResults = [];
    prevRenderMode = "Hint";
    recordsWindowActive = false;

    initializeUser = async () => {
        await fetch(url_users, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"Name" : this.state.userName , "NumShots" : 0})

        }).then((response) => {
                if (!response.ok) {
                    return Promise.reject(new Error(
                            'Response failed: ' + response.status + ' (' + response.statusText + ')'
                        )
                    );
                }
                return response.json();

        }).then((data) => {
            this.setState({userId : data.id, userHits : 0, userShots : 0});

        }).then(() => console.log("Initialized user and update his ID"))

        .catch(() => {
                this.setState({serverError : true});
        });

    }

    updateUser = async () => {
        await fetch(url_users, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"Id": this.state.userId, "Name" : this.state.userName, "NumShots" : Math.min.apply(Math, this.ListOfResults)})

        }).then(() => console.log("Put the number of shots of the current user to the server"))

        .catch(() => {
            this.setState({serverError : true});
        });

    }

    getRecords = async () => {
        await fetch((url_users + "/top")).then((response) => {
            if (!response.ok) {
                return Promise.reject(new Error(
                        'Response failed: ' + response.status + ' (' + response.statusText + ')'
                    )
                );
            }
            return response.json();
        }).then((data) => {this.setState({records : data})

        }).then(() => console.log("Asked server about current records"))

        .catch(() => {
            this.setState({serverError : true});
        });
    }

    requestPositionsChange = async () => {
        await fetch(url_shiptypes, {method: "PUT"})
            .catch(() => {
                this.setState({serverError : true});
            });
    }

    getPositions = async () => {
        const occupiedCells = this.state.occupiedCells.slice();
        await fetch(url_shiptypes)

            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(new Error(
                        'Response failed: ' + response.status + ' (' + response.statusText + ')'
                    ));
                }
                return response.json();

            }).then((data) => {

                for (let i = 0; i <= 99; i++){

                    if (data[0].position.includes(this.transformCoordinates(i))){
                        occupiedCells[i] = 1;
                        // carrier positions
                    }
                    else if (data[1].position.includes(this.transformCoordinates(i))) {
                        occupiedCells[i] = 2;
                         // battleship positions
                    }
                    else if (data[2].position.includes(this.transformCoordinates(i))) {
                        occupiedCells[i] = 3;
                         // cruiser positions
                    }
                    else if (data[3].position.includes(this.transformCoordinates(i))) {
                        occupiedCells[i] = 4;
                         // submarine positions
                    }
                    else if (data[4].position.includes(this.transformCoordinates(i))) {
                        occupiedCells[i] = 5;
                         // destroyer positions
                    }

                }

                this.setState({
                    occupiedCells : occupiedCells,
                    carrierSize : data[0].size, carrierHealth: data[0].size,
                    battleshipSize : data[1].size, battleshipHealth: data[1].size,
                    cruiserSize : data[2].size, cruiserHealth: data[2].size,
                    submarineSize : data[3].size, submarineHealth: data[3].size,
                    destroyerSize : data[4].size, destroyerHealth: data[4].size,
                });

                }).catch(() => {
                    this.setState({serverError : true});
                });

    }

    handleInputChange = (event) => {
        this.setState({userName: event.currentTarget.value, nameChanged : true});
    }

    checkHit = (Id) => {

        if (this.state.activeCells[Id] === true && Boolean(this.state.occupiedCells[Id]) === true){
            this.addShot();
            this.addHit();
            this.changeCellStatus(Id);

            if (this.state.occupiedCells[Id] === 1 ){
                this.setState({carrierSize : this.state.carrierSize - 1});
            }

            else if (this.state.occupiedCells[Id] === 2 ){
                this.setState({battleshipSize : this.state.battleshipSize - 1});
            }

            else if (this.state.occupiedCells[Id] === 3){
                this.setState({cruiserSize : this.state.cruiserSize - 1});
            }

            else if (this.state.occupiedCells[Id] === 4 ){
                this.setState({submarineSize : this.state.submarineSize - 1});
            }

            else if (this.state.occupiedCells[Id] === 5 ){
                this.setState({destroyerSize : this.state.destroyerSize - 1});
            }

        }
        else if (this.state.activeCells[Id] === true && this.state.occupiedCells[Id] === false){
            this.addShot();
            this.changeCellStatus(Id);
        }
    }

    changeCellStatus = (Id) => {
        const activeCells = this.state.activeCells.slice();
        activeCells[Id] = false;
        this.setState({activeCells : activeCells});
    }

    clearCellsData = async () => {
        this.setState({
            activeCells : Array(100).fill(true),
            occupiedCells : Array(100).fill(false),
        });
    }

    pushResult = (number) => {
        this.ListOfResults.push(number);
    }

    clearResults = () => {
        this.ListOfResults.length = 0;
    }

    changeButtonName = () =>{
        if (this.state.buttonIsClicked === true && this.state.nameChanged === false) {
            return "Retry"
        }
        else {
            return "New Game"
        }
    }

    transformCoordinates = (number) => {
        return (`${Math.floor(number / 10)},${number % 10}`);
    }

    addShot = () => {
        this.setState((state) => {
            return {userShots : (state.userShots + 1)}
        });
    }

    addHit = () => {
        this.setState((state) => {
            return {userHits : (state.userHits + 1)}
        });
    }

    createList = (number) => {
        let array = [];
        for (let i = 0; i <= number; i++){
            array.push(i);
        }
        return array;
    }

    refreshPage = () => {
        window.location.reload();
    }

    onClickNewGame = () => {

        this.recordsWindowActive = false;

        if (this.state.nameChanged === true) {

            this.clearResults();
            let promise1;
            let promise2;
            this.getRecords();

            this.setState({renderMode: "SandGlass", nameChanged : false, buttonIsClicked: true});

            promise2 = this.initializeUser();

            promise1 = this.clearCellsData()
                .then(() => this.requestPositionsChange())
                .then(() => this.getPositions());
            Promise.all([promise1, promise2])
                .then(() => this.setState({renderMode: "NewGame"}));

        } //Retry case
        else if (this.state.nameChanged === false && this.state.userId !== undefined){

            this.setState({renderMode: "SandGlass", userShots: 0, userHits: 0});
            this.clearCellsData();
            this.requestPositionsChange()
                .then(() => this.getPositions())
                .then(() => this.setState({renderMode: "NewGame"}));
        }
    }

    onClickRecords = () => {

        if (this.state.renderMode !== "SandGlass" && this.state.renderMode !== "Records") {
            this.prevRenderMode = this.state.renderMode;
        }

        this.setState({renderMode: "SandGlass"});

        this.getRecords()

            .then(() => {

                if (this.recordsWindowActive === false ) {
                    this.recordsWindowActive = true;
                    this.setState({renderMode: "Records"});

                }

                else if (this.recordsWindowActive === true) {
                    this.recordsWindowActive = false;
                    this.setState({renderMode: this.prevRenderMode});

                }
            });
    }

    onGameOver = () => {
        this.pushResult(this.state.userShots);
        this.setState({renderMode : "SandGlass"}, () => {
            this.updateUser()
                .then(() => this.getRecords())
                .then(() => this.setState({renderMode : "GameOver"}))
        });
    }

    renderHeader = () => {
        return (
            <Header
                onChange = {(event) => this.handleInputChange(event)}
                NewGame ={async () => this.onClickNewGame()}
                Records = {() => this.onClickRecords()}
                Name = {this.state.userName}
                changeButtonName = {() => this.changeButtonName()}
            />
        );
    }

    renderResTable = () => {
        return (
            <ResTable
                NumShots = {this.state.userShots}
                NumHits = {this.state.userHits}
                gameOver = {() => this.onGameOver()}
            />
        );
    }

    renderBattleField = () => {
        return (
            <Battlefield
                userHits = {this.state.userHits}
                checkHit = {(Id) => this.checkHit(Id)}
                activeCells = {this.state.activeCells}
                occupiedCells = {this.state.occupiedCells}
            />
        );
    }

    renderShipsInfo = () => {
        return (
            <ShipsInfo
                carrierSize = {this.state.carrierSize}
                carrierHealth = {this.state.carrierHealth}
                battleshipSize = {this.state.battleshipSize}
                battleshipHealth = {this.state.battleshipHealth}
                cruiserSize = {this.state.cruiserSize}
                cruiserHealth = {this.state.cruiserHealth}
                submarineSize = {this.state.submarineSize}
                submarineHealth = {this.state.submarineHealth}
                destroyerSize = {this.state.destroyerSize}
                destroyerHealth = {this.state.destroyerHealth}
            />
        );
    }

    renderHint = () => {
        return (
        <div className="Main">
            <div className = "HintAligner">
                <p className = "Welcome">Welcome to the SeaBattle Game!</p>

                <div className = "HintList">
                    <ul>
                        <li>To start a new game, please, enter your name and click "NewGame".</li>
                        <li>If you want to see the Honor Board click "Records".</li>
                        <li>Not happy with the first result? Click "Retry" and have your revenge! </li>
                    </ul>
                </div>
            </div>
        </div>
        );
    }

    renderSandGlass = () => {
        return (
            <div className="Main">
                <img className = "SandGlass" src = {SandGlass} alt = "SandGlass"/>
            </div>
        );
    }

    renderNewGame = () => {
        return (
            <div className="Main">
                    <div className="LeftField">
                        {this.renderResTable()}
                        {this.renderShipsInfo()}
                    </div>

                    <div className="RightField">
                        {this.renderBattleField()}
                    </div>
            </div>
        );
    }

    renderRecords = () => {
        const renderList = this.createList(this.state.records.length - 1 );
        return (
            <div className = "Main">
            <div className = "RecordsAligner">
                <div className="TableName">Honor Board</div>
                <div className ="RecordsBody">
                    <table>
                        <tbody>
                            <tr><td>Name</td><td>Shots</td></tr>
                            {renderList.map(i => (this.renderTableRow(i)))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );
    }

    renderTableRow = (i) => {
       if (this.state.records[i].id === this.state.userId){
           return (
               <tr className ="withMyId" key = {i}><td >{this.state.records[i].name}</td><td >{this.state.records[i].numShots}</td></tr>
           );
       } else {
           return (
               <tr key = {i}><td className ="withoutMyId">{this.state.records[i].name}</td><td className ="withoutMyId">{this.state.records[i].numShots}</td></tr>
           );
       }
    }

    renderGameOver = () => {
        const renderList = this.createList(this.state.records.length - 1 );
        return (
            <div className = "Main">
                <div className = "ResultsTable">
                    <div className="GOTableName">Best results</div>
                        <div className ="GORecordsBody">
                            <table>
                                <tbody>
                                <tr><td>Name</td><td>Shots</td></tr>
                                {renderList.map(i => (this.renderTableRow(i)))}
                                </tbody>
                            </table>
                        </div>
                </div>
                <div className = "Verdict">
                    <h2> Game Over! </h2>
                    <p className = "Tittle"> Your current result: </p>
                    <p className = "Scores">{this.ListOfResults[this.ListOfResults.length - 1]}</p>
                </div>
            </div>
        );
    }


    renderMain = () => {

        if (this.state.renderMode === "Hint"){
            return this.renderHint();
        }
        else if (this.state.renderMode === "NewGame"){
            return this.renderNewGame();
        }
        else if (this.state.renderMode === "Records"){
            return this.renderRecords();
        }
        else if (this.state.renderMode === "GameOver"){
            return this.renderGameOver();
        }
        else if (this.state.renderMode === "SandGlass"){
            return this.renderSandGlass();
        }
    }

    render () {
        if (this.state.serverError === false) {
            return (
                <div>
                    {this.renderHeader()}
                    {this.renderMain()}
                </div>
            );
        }
        return (
            <div className = "ServerError">
                <p>Connection Error</p>
                <p>An SeaBattle game server may be down. Please try again later.</p>
                <button onClick = {this.refreshPage}>Try Again</button>
            </div>
        );
    }
}

export default App;