create table Tovary
(
tovar_id int not null,
name_tovara varchar(50) not null,
kategorii_id int not null,
proizvoditel_id int not null,
koli4estvo_na_sklade int not null,
primary key (tovar_id)
)

create table Kategorii
(
kategorii_id int not null,
name_kategorii varchar(50) not null,
primary key (kategorii_id)
)


create table Proizvoditeli
(
proizvoditel_id int not null,
name_proizvoditelya varchar(50) not null,
strana_proizvoditelya varchar(50) not null,
primary key (proizvoditel_id)
)

create table Pokupateli
(
pokupatelya_id int not null,
pokupatelya_f varchar(30) not null,
pokupatelya_i varchar(30) not null,
pokupatelya_o varchar(30) null,
gorod varchar(30) null,
telefon varchar(12) null,
primary key (pokupatelya_id) 
)

create table Zakazy
(
zakaz_id int not null,
pokupatel_id int not null,
data_zakaza date not null,
oplata bit not null,
primary key (zakaz_id, pokupatel_id)
)

create table Soderzhimoe_zakaza
(
zakaz_id int not null,
pokupatel_id int not null,
tovar_id int not null,
koli4estvo int not null,
primary key (zakaz_id, pokupatel_id, tovar_id)
)

alter table Tovary add foreign key (kategorii_id) references Kategorii (kategorii_id)
alter table Tovary add foreign key (proizvoditel_id) references Proizvoditeli (proizvoditel_id)
alter table Zakazy add foreign key (pokupatel_id) references Pokupateli (pokupatelya_id)
alter table Soderzhimoe_zakaza add foreign key (tovar_id) references Tovary (tovar_id)
alter table Soderzhimoe_zakaza add foreign key (zakaz_id, pokupatel_id) references Zakazy (zakaz_id, pokupatel_id)