create database retoTecnico;

use retoTecnico;

create table empresa(
	id int primary key not null auto_increment,
	nombre varchar(255) not null,
	fecha_constitucion date,
    comentarios varchar(1020),
    favorita float
);

insert into empresa(nombre,fecha_constitucion,comentarios,favorita) 
values('empresa1','2001-02-01','comentariossss',False);

select * from empresa;