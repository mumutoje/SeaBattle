using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.ShipPositioningLogic
{
    public class Battlefield
    {
        static public int[][] Field;
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

        // Get value of the specific cell in the field
        static public int GetValue(int[] indexes)
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
        static public int[] GetRandom()
        {
            int[] Indexes = new int[2];
            Random rnd = new Random();
            Indexes[0] = rnd.Next(0, 9);
            Indexes[1] = rnd.Next(0, 9);
            return Indexes;
        }
        // Returns visual interpretation of the Battlefield (only for debug purposes)
        public void ShowField()
        {
            for (int i = 0; i <= 9; i++)
            {
                for (int j = 0; j <= 9; j++)
                {
                    if (j != 9)
                    {
                        Console.Write($"{Field[i][j]} ");
                    }
                    else
                    {
                        Console.Write($"{Field[i][j]} \n");
                    }
                }
            }
        }
    }
}
