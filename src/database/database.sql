//se crea base de datos Examen
create database Examen;

//se crea tabla food_type
CREATE TABLE public.food_types
(
    slug character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT food_types_pkey PRIMARY KEY (slug)
)

TABLESPACE pg_default;

ALTER TABLE public.food_types
    OWNER to postgres;

//se creatabala restaurant
CREATE TABLE public.restaurant
(
    slug character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    logo character varying COLLATE pg_catalog."default",
    rating double precision NOT NULL,
    food_type character varying COLLATE pg_catalog."default" NOT NULL,
    reviews character varying COLLATE pg_catalog."default",
    CONSTRAINT restaurant_pkey PRIMARY KEY (slug)
)

TABLESPACE pg_default;

ALTER TABLE public.restaurant
    OWNER to postgres;

//se crea tabala reviews
CREATE TABLE public.reviews
(
    slug character varying COLLATE pg_catalog."default" NOT NULL,
    restaurant character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    comments character varying COLLATE pg_catalog."default",
    rating double precision NOT NULL,
    created timestamp with time zone NOT NULL,
    CONSTRAINT reviews_pkey PRIMARY KEY (slug)
)

TABLESPACE pg_default;

ALTER TABLE public.reviews
    OWNER to postgres;