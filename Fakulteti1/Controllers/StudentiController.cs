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
    public class StudentiController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public StudentiController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
           
        }

        [HttpGet]

        public JsonResult Get()
        {
            string query = @"
                          select Id_Studenti, Emri, Mbiemri, Lenda, Datelindja from dbo.Studenti";
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

        public JsonResult Post(Studenti s)
        {
            string query = @"
                          insert into Studenti values
                          ('" + s.Emri + @"','" + s.Mbiemri + @"','" + s.Lenda + @"','" + s.Datelindja + @"')";
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

        public JsonResult Put(Studenti s)
        {
            string query = @"
                          update Studenti set 
                          Emri = '" + s.Emri + @"',
                          Mbiemri = '" + s.Mbiemri + @"',
                          Lenda = '" + s.Lenda + @"', 
                          Datelindja = '" + s.Datelindja + @"'
                          where Id_Studenti='"+s.Id_Studenti+@"'
                          
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
                          delete from Studenti
                          where Id_Studenti = " + id + @" 
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
        [Route("GetLendet")]
        public JsonResult GetLendet()
        {
            string query = @"
                          select Emri from Lenda
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
            return new JsonResult(table);
        }
    }
    }
   


