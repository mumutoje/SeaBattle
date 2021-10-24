using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
    public class MyBaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<ShipType> ShipTypes { get; set; }
        public MyBaseContext(DbContextOptions<MyBaseContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
