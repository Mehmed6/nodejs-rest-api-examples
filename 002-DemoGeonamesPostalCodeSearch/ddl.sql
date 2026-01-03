create table if not exists postal_codes (
    code varchar(100) primary key,
    record_date_time timestamp default(current_timestamp) not null
    );

create table if not exists postal_code_info (
    postal_code_info_id bigserial primary key,
    postal_code varchar(100) references postal_codes(code) not null,
    adminCode2 varchar(250),
    adminCode1 varchar(250),
    adminName2 varchar(250),
    lng double precision not null,
    lat double precision not null,
    countryCode char(3) not null,
    adminName1 varchar(250),
    placeName varchar(250)
    );