using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.ShipPositioningLogic;
using Newtonsoft.Json;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShipTypesController : ControllerBase
    {
        MyBaseContext db;
                
        public ShipTypesController(MyBaseContext context)
        {
                     
            db = context;

            //Initializes positions of all ships at the first call of ShipTypes Controller
            
            Positions.InitializeShips();

            if(db.ShipTypes.Count() != 0)
            {
              
            }
            else
            {
                db.ShipTypes.Add(new ShipType { Type = "Carrier", Size = 5, Count = 1, Position = $"{JsonConvert.SerializeObject(Positions.ShipPos[0])}" });
                db.ShipTypes.Add(new ShipType { Type = "Battleship", Size = 4, Count = 1, Position = $"{JsonConvert.SerializeObject(Positions.ShipPos[1])}" });
                db.ShipTypes.Add(new ShipType { Type = "Cruiser", Size = 3, Count = 1, Position = $"{JsonConvert.SerializeObject(Positions.ShipPos[2])}" });
                db.ShipTypes.Add(new ShipType { Type = "Submarine", Size = 3, Count = 1, Position = $"{JsonConvert.SerializeObject(Positions.ShipPos[3])}" });
                db.ShipTypes.Add(new ShipType { Type = "Destroyer", Size = 2, Count = 1, Position = $"{JsonConvert.SerializeObject(Positions.ShipPos[4])}" });
            }
            
            db.SaveChanges();
        }

        // Returns information about ships positions and initial health state
        // GET/api/shiptypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShipType>>> Get()
        {
            return await db.ShipTypes.ToListAsync();
        }


       // Updates positions of the ships in the table
       // PUT api/shiptypes
       [HttpPut]
        public async Task<ActionResult<ShipType>> Put()
        {
            var PosToUpdate = db.ShipTypes.ToList();

            if (PosToUpdate.Count == 0)
            {
                return BadRequest();
            }

            int i = 0;
            foreach(var pos in PosToUpdate)
            {
                pos.Position = JsonConvert.SerializeObject(Positions.ShipPos[i]);
                i++;
            }

            await db.SaveChangesAsync();
            return Ok();
        }
          
    }
}


