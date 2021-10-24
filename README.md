# SeaBattle
Content of this repository represents source code of the SeaBattle game: https://seabattleakvelon.herokuapp.com
According to design task, see "Task" folder, application consists of two parts: backend and frontend.

Backend part was designed using C# language and ASP.NET Core framework. By means of special algorithm, backend generates random ships positions and store them in database. On HTTP request it can change positions or provide them to the frontend part. Backend also gets information about current user, store this information in database and by means of differents HTTP requests performs some actions and returns result back to the frontend.

Backend API description.

Actions with information about ships:
GET hostname/api/shiptypes Returns information about ships positions and their initial health state;
PUT hostname/api/shiptypes Makes backend generate and store new ships positions in database;

Actions with information about users:
GET hostname/api/users Returns a list of users in shots-ascending order;
GET hostname/api/users/top Returns a list of users with number of shots higher or equal than 17 in shot-ascending order;
POST hostname/api/users Initializes a new user by his name and number of shots {"Name" : "Ivan", "NumShots" : 0 };
PUT hostname/api/users/ Updates the number of shots of the specific user. There is a need to request in a way {"Id" : 1, "Name" : "Ivan", "NumShots" : NEW NUMBER };
PUT hostname/api/users/clear ***Optional*** Deletes information about all users.

How to test backend part?

If you want to test backend API you can send HTTP requests to https://battleshipsmumutoje.azurewebsites.net or if you want to run backend application locally you need:
1) Clone repository: git clone https://github.com/mumutoje/SeaBattle.git
2) Install MS Visual Studio
3) Open Battleships_Game.sln in MS Visual Studio
4) Start debugging
5) Send requests to http://localhost:6811 by means Postman or alike software
