using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
    
    public class ShipType
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int Size { get; set; }
        public int Count { get; set; }
        public string Position { get; set; }

    }
}
