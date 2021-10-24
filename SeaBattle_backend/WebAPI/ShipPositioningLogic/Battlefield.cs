using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.ShipPositioningLogic
{
    public class Battlefield
    {
        public static int[][] Field;

        public Battlefield()
        {
            GetFilled();
        }

        // Put in the field "Field" the 10x10 array of zeroes
        public void GetFilled()
        {
            Field = new int[10][];

            for (int i = 0; i <= 9; i++)
            {
                Field[i] = new int[10];
            }

        }

        // Gets value of the specific cell in the field
        public static int GetValue(int[] indexes)
        {
            return Field[indexes[0]][indexes[1]];
        }

        // Gets positions of the specific ship and put them onto the battlefield
        public void PlaceShip(Ship Name)
        {
            for (int i = 0; i <= (Name.size - 1); i++)
            {
                Field[Name.positions[i][0]][Name.positions[i][1]] = 1;
            }
        }

        // Returns random tuple of coordinates in range [0,9]
        public static int[] GetRandom()
        {
            int[] Indexes = new int[2];
            Random rnd = new Random();
            Indexes[0] = rnd.Next(0, 9);
            Indexes[1] = rnd.Next(0, 9);
            return Indexes;
        }
    }
}
