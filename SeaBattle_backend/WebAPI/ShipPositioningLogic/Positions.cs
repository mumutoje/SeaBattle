using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ShipPositioningLogic;

namespace WebAPI.ShipPositioningLogic
{
    public class Positions
    {
        public static int[][][] ShipPos = new int[5][][];
        
        public static void InitializeShips()
        {
            Battlefield Field = new();
            
            Ship Carrier = new();
            Carrier.size = 5;
            ShipPos[0] = Carrier.GetPositions();
            Field.PlaceShip(Carrier);
            
            Ship BattleShip = new();
            BattleShip.size = 4;
            ShipPos[1] = BattleShip.GetPositions();
            Field.PlaceShip(BattleShip);
            
            Ship Cruiser = new();
            Cruiser.size = 3;
            ShipPos[2] = Cruiser.GetPositions();
            Field.PlaceShip(Cruiser);

            Ship Submarine = new();
            Submarine.size = 3;
            ShipPos[3] = Submarine.GetPositions();
            Field.PlaceShip(Submarine);

            Ship Destroyer = new();
            Destroyer.size = 2;
            ShipPos[4] = Destroyer.GetPositions();
            Field.PlaceShip(Destroyer);

            
        }

     }
}
