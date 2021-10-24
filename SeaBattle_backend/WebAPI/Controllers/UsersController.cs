using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;
using WebAPI.ShipPositioningLogic;


namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        MyBaseContext db;
        public UsersController(MyBaseContext context)
        {
            db = context;
        }

        // Returns the list of users who finished the game successfully (hits-ascending order)
        // GET/api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return await db.Users.OrderBy(p=>p.NumShots).ToListAsync();
        }
                 
           
        // Returns top according to the number of shots records from the table "Users"
        // GET api/users/top
        [HttpGet("top")]
        public async Task<ActionResult<IEnumerable<User>>> GetTop()
        {
            List<User> Top = new();

            return Top = await db.Users.OrderBy(x => x.NumShots).Where(x => x.NumShots >= 17).ToListAsync(); 
        }

        // Initializes a new user by his name and number of shots: {"Name" : "Ivan", "NumShots" : 0 }
        // POST api/users
        [HttpPost]
        public async Task<ActionResult<User>> Post(User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            db.Users.Add(user);
            await db.SaveChangesAsync();
            return Ok(user);
        }

        // Updates the number of hits of the specific user. There is a need to request in a way: {"Id" : 1, "Name" : "Ivan", "NumShots" : NEW NUMBER }
        // PUT api/users/
        [HttpPut]
        public async Task<ActionResult<User>> Put(User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            if (!db.Users.Any(x => x.Id == user.Id))
            {
                return NotFound();
            }

            db.Update(user);
            await db.SaveChangesAsync();
            return Ok(user);
        }

        // ***Optional*** Deletes information about all users.
        // PUT api/users/clear
        [HttpPut("clear")]
        public async Task<ActionResult<User>> Clear()
        {
            db.Users.RemoveRange(db.Users);
            await db.SaveChangesAsync();
            return Ok();
        }
    }
}


