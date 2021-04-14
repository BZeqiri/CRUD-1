create database Fakulteti
use Fakulteti

create table Studenti(
Id_Studenti int identity(1,1),
Emri varchar (50) not null,
Mbiemri varchar(50) not null,
Lenda varchar(50),
Datelindja date,
)

create table Lenda(
Id_Lenda int identity(1,1) ,
Emri varchar (40) not null,
)
