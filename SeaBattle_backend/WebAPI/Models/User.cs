using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        // Number of shots up to the game end
        public int NumShots { get; set; }
    }
}
