using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.ShipPositioningLogic
{
    public class Ship
    {
        public int size;
        public int[][] positions;
        int[][] PositionsUp, PositionsDown, PositionsLeft, PositionsRight;
        int FlagUp, FlagDown, FlagRight, FlagLeft;

        // Creates the dictionary with all available in geometric sense positions
        public int[][] GetPositions()
        {

            Dictionary<int, int[][]> Results = new Dictionary<int, int[][]>();

            while (Results.Count == 0)
            {

                int[] InitCoord = Battlefield.GetRandom();

                // Creates an array of available (according to the index on the field) positions above the initial point
                if ((InitCoord[1] - (size - 1)) >= 0)
                {
                    PositionsUp = new int[size][];
                    ArrayInitializer(PositionsUp);
                    FlagUp = 1;
                    for (int i = 0; i <= (size - 1); i++)
                    {
                        PositionsUp[i][0] = InitCoord[0];
                        PositionsUp[i][1] = InitCoord[1] - 1 * i;

                    }

                }
                // Creates the array of available (according to the index on the field) positions below the initial point
                if ((InitCoord[1] + (size - 1)) <= 9)
                {
                    PositionsDown = new int[size][];
                    ArrayInitializer(PositionsDown);
                    FlagDown = 1;
                    for (int i = 0; i <= (size - 1); i++)
                    {
                        PositionsDown[i][0] = InitCoord[0];
                        PositionsDown[i][1] = InitCoord[1] + 1 * i;
                    }
                }
                // Creates the array of available (according to the index on the field) positions to the left from the initial point
                if ((InitCoord[0] - (size - 1)) >= 0)
                {
                    PositionsLeft = new int[size][];
                    ArrayInitializer(PositionsLeft);
                    FlagLeft = 1;
                    for (int i = 0; i <= (size - 1); i++)
                    {
                        PositionsLeft[i][1] = InitCoord[1];
                        PositionsLeft[i][0] = InitCoord[0] - 1 * i;
                    }
                }
                // Creates the array of available (accvording to the index on the field) positions to the right from the initial point
                if ((InitCoord[0] + (size - 1)) <= 9)
                {
                    PositionsRight = new int[size][];
                    ArrayInitializer(PositionsRight);
                    FlagRight = 1;
                    for (int i = 0; i <= (size - 1); i++)
                    {
                        PositionsRight[i][1] = InitCoord[1];
                        PositionsRight[i][0] = InitCoord[0] + 1 * i;
                    }
                }

                // Here we fill the dictionary with all possible in geometric sense positions of the ship with specified size

                int count = 0;
                if (FlagUp == 1)
                {
                    Results.Add(count, PositionsUp);
                    count++;
                }
                if (FlagDown == 1)
                {
                    Results.Add(count, PositionsDown);
                    count++;
                }
                if (FlagLeft == 1)
                {
                    Results.Add(count, PositionsLeft);
                    count++;
                }
                if (FlagRight == 1)
                {
                    Results.Add(count, PositionsRight);
                    count++;
                }

                // Checks wheather specific postion is occupied or not
                foreach (KeyValuePair<int, int[][]> record in Results)
                {
                    foreach (int[] i in record.Value)
                    {
                        if (Battlefield.GetValue(i) == 1)
                        {
                            Results.Remove(record.Key);
                        }
                    }
                }

            }

            // Here we save an array of possible keys of the dictionary Results to randomly choose one 
            int[] ArrayOfKeys = Results.Keys.ToArray();
            Random RndPos = new Random();
            positions = Results[ArrayOfKeys[RndPos.Next((ArrayOfKeys.Length) - 1)]];
            return positions;
        }

        // This function initializes the array of arrays with dimensions [size][2]
        public void ArrayInitializer(int[][] array)
        {
            for (int i = 0; i <= (size - 1); i++)
            {
                array[i] = new int[2];
            }
        }

    }
}
