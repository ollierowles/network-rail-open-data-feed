\cd '';

\connect postgres;

DROP DATABASE IF EXISTS  cclassmessages;
CREATE DATABASE cclassmessages;

-- 3) Create the table TradingRoute with the corresponding attributes.
CREATE TABLE  CClassMessages  (
 Id  serial NOT NULL UNIQUE, 
 AreaId text,
 ToBerth  text,
 FromBerth  text, 
 Descr  text,
 MsgTime integer,
PRIMARY KEY ( Id )
);