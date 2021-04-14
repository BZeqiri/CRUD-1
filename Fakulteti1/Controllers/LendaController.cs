using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Fakulteti1.NewFolder;
using Microsoft.AspNetCore.Hosting;

namespace Fakulteti1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LendaController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LendaController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                          select Id_Lenda, Emri from dbo.Lenda";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]

        public JsonResult Post(Lenda l)
        {
            string query = @"
                          insert into Lenda values
                          ('"+l.Emri+@"')";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }

        [HttpPut]

        public JsonResult Put(Lenda l)
        {
            string query = @"
                          update Lenda set
                          Emri = '"+l.Emri+@"'
                           where Id_Lenda ='"+l.Id_Lenda+@"'
                          ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                   myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }


        [HttpDelete("{id}")]

        public JsonResult Delete(int id)
        {
            string query = @"
                          delete from Lenda
                          where Id_Lenda = " + id + @" 
                           ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("StudentiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Deleted Successfully");
        }
    }
}
