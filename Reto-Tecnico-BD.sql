create database retoTecnico;

use retoTecnico;

create table empresa(
	id int primary key not null auto_increment,
	nombre varchar(255) not null,
	fecha_constitucion date,
	tipo_empresa varchar(50),
    comentarios varchar(1020),
    favorita float
);

insert into empresa(nombre,fecha_constitucion,tipo_empresa,comentarios,favorita) 
values('empresa1','2001-02-01','Distribuidor','comentariossss',False);

update empresa
set nombre = 'up', fecha_constitucion = '2002-01-01', tipo_empresa = 'Distribuidor',comentarios = '',favorita = True
where id = 2;

delete from empresa where id = 1;

drop table empresa;

select * from empresa;