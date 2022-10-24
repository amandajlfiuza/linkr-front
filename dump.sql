--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: hashtags_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags_posts (
    id integer NOT NULL,
    hashtag_id integer NOT NULL,
    post_id integer NOT NULL
);


--
-- Name: hashtags_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_posts_id_seq OWNED BY public.hashtags_posts.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_url text NOT NULL,
    body text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(150) NOT NULL,
    email character varying(200) NOT NULL,
    password text NOT NULL,
    picture_url text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: hashtags_posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags_posts ALTER COLUMN id SET DEFAULT nextval('public.hashtags_posts_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags VALUES (1, 'python', '2022-10-23 15:26:25.735184');


--
-- Data for Name: hashtags_posts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (126, 1, 4, '2022-10-20 20:11:53.012759');
INSERT INTO public.likes VALUES (195, 4, 4, '2022-10-23 10:28:53.3297');
INSERT INTO public.likes VALUES (154, 3, 4, '2022-10-21 15:28:36.383256');
INSERT INTO public.likes VALUES (218, 4, 3, '2022-10-23 17:21:01.961396');
INSERT INTO public.likes VALUES (163, 5, 4, '2022-10-21 17:08:51.953005');
INSERT INTO public.likes VALUES (164, 3, 3, '2022-10-21 19:04:29.481011');
INSERT INTO public.likes VALUES (165, 3, 2, '2022-10-21 19:05:00.911772');
INSERT INTO public.likes VALUES (219, 4, 2, '2022-10-23 17:38:09.190108');
INSERT INTO public.likes VALUES (222, 4, 1, '2022-10-24 16:09:51.686695');


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (1, 1, 'https://reactjs.org/docs/getting-started.html', 'Sempre muito bom aprender React na fonte', '2022-10-19 15:10:27.882147');
INSERT INTO public.posts VALUES (2, 1, 'https://reactjs.org/docs/getting-started.html', 'React é top!!', '2022-10-19 15:50:49.340055');
INSERT INTO public.posts VALUES (3, 1, 'https://reactjs.org/docs/getting-started.html', 'Terceiro post!!', '2022-10-19 15:51:16.048195');
INSERT INTO public.posts VALUES (4, 2, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 'O bom e velho JavaScript!', '2022-10-20 15:47:16.416657');
INSERT INTO public.posts VALUES (105, 4, 'https://www.python.org/', '', '2022-10-24 16:27:28.182785');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 3, 'a8e5aa37-457d-4447-ad79-983195b07630', true, '2022-10-21 10:58:14.333812');
INSERT INTO public.sessions VALUES (2, 4, '82d2345a-c2ec-42f9-b23f-27d50db148af', true, '2022-10-21 16:30:48.389113');
INSERT INTO public.sessions VALUES (3, 5, '35deb70c-60ba-43dd-9f8f-4b3c74ba248c', true, '2022-10-21 16:41:01.807528');
INSERT INTO public.sessions VALUES (4, 4, 'd055f0a7-2024-4768-bf7b-ae394bdf62b0', true, '2022-10-21 19:31:45.227598');
INSERT INTO public.sessions VALUES (5, 4, '725a7647-1e57-4001-9512-cc95061074ef', true, '2022-10-21 19:32:03.1452');
INSERT INTO public.sessions VALUES (6, 4, 'bca397bc-02c7-445f-b4a0-0185f6097e9b', true, '2022-10-21 19:32:49.416581');
INSERT INTO public.sessions VALUES (7, 4, 'b2ca5d2f-cc1b-47ae-90f8-31098fed8f56', true, '2022-10-21 19:34:21.522114');
INSERT INTO public.sessions VALUES (8, 4, '16b40dac-d17f-4177-95a5-106a4db6bd25', true, '2022-10-21 19:35:32.358318');
INSERT INTO public.sessions VALUES (9, 4, '2683e075-9a4c-4de7-8e11-c06961530c57', true, '2022-10-21 19:38:10.150696');
INSERT INTO public.sessions VALUES (10, 4, '5e3c8a61-1f6c-4933-afd8-992b6dbd8787', true, '2022-10-21 19:38:36.265253');
INSERT INTO public.sessions VALUES (11, 4, 'c7dae0e0-c015-4cbf-969f-1677fc161ee7', true, '2022-10-21 19:40:25.147193');
INSERT INTO public.sessions VALUES (12, 4, 'db7c758f-12ff-4991-8fd0-4a67167b1fdb', true, '2022-10-21 19:58:15.020765');
INSERT INTO public.sessions VALUES (13, 4, '725ac432-8057-4299-8b52-3749f025ae24', true, '2022-10-21 20:43:59.039002');
INSERT INTO public.sessions VALUES (14, 4, '1a8a97f4-df23-46d1-bfcc-fa6bb549d7fa', true, '2022-10-21 20:44:43.62034');
INSERT INTO public.sessions VALUES (15, 4, '118cd8cd-20f3-4fc0-8fdc-40f7964f0748', true, '2022-10-21 20:44:57.899867');
INSERT INTO public.sessions VALUES (16, 4, '8a39341f-fbaa-4fe6-a397-c3d2777d2e13', true, '2022-10-21 21:40:15.884636');
INSERT INTO public.sessions VALUES (17, 4, 'be020829-265a-466b-9a55-525be9be5f2a', true, '2022-10-21 21:43:21.497615');
INSERT INTO public.sessions VALUES (18, 4, 'cfd29678-f73d-4c65-995b-da90c2b226a7', true, '2022-10-21 21:45:21.166522');
INSERT INTO public.sessions VALUES (19, 4, '84b0386f-f373-48ea-9906-fc81027d89cd', true, '2022-10-21 21:47:12.622557');
INSERT INTO public.sessions VALUES (20, 4, 'd93e4d1a-18a5-47b1-8172-923812cca4be', true, '2022-10-21 21:48:15.452465');
INSERT INTO public.sessions VALUES (21, 4, 'f535bd02-bdc1-47d1-9836-845732511d03', true, '2022-10-21 21:49:12.778182');
INSERT INTO public.sessions VALUES (22, 4, '33eb10de-c65f-43dc-bb70-eb415434cda4', true, '2022-10-21 21:49:26.305914');
INSERT INTO public.sessions VALUES (23, 4, '534e2bad-6de1-4bb0-bb3f-cae875a063f8', true, '2022-10-21 21:54:20.594782');
INSERT INTO public.sessions VALUES (24, 4, '99e169dd-81dc-47a0-bc5d-a59931fe0230', true, '2022-10-21 21:59:20.092284');
INSERT INTO public.sessions VALUES (25, 4, '843774cc-b366-4d8b-8210-ad8ac2538d24', true, '2022-10-21 21:59:56.014237');
INSERT INTO public.sessions VALUES (26, 4, '8a465a86-d85b-446a-9d49-486416ad983e', true, '2022-10-21 22:00:18.306828');
INSERT INTO public.sessions VALUES (27, 4, '31708ec3-a84b-4cc4-95af-c9a1aa84c91e', false, '2022-10-23 09:58:41.661171');
INSERT INTO public.sessions VALUES (28, 4, 'cb38bc91-c687-4fa9-bf37-3f7efbe93220', false, '2022-10-23 10:00:53.652466');
INSERT INTO public.sessions VALUES (29, 4, '6e62b8f3-c62f-4842-952e-9d5539903ccd', false, '2022-10-23 10:02:25.604176');
INSERT INTO public.sessions VALUES (30, 4, '89205852-b0d9-43d1-a857-778a5d0a793f', false, '2022-10-23 15:11:58.461966');
INSERT INTO public.sessions VALUES (31, 4, '71853565-ec34-4941-a5a5-5210b93edaab', true, '2022-10-23 15:12:32.929545');
INSERT INTO public.sessions VALUES (32, 4, 'c46b4225-5e19-42af-9cb1-83410dc9f96c', true, '2022-10-23 15:20:30.847989');
INSERT INTO public.sessions VALUES (33, 4, '28e6940e-fd51-4c73-b9a1-a424f89e954c', true, '2022-10-24 15:23:44.49425');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Claudio Guedes', 'cgsarmentosilva@gmail.com', '1234', 'https://veja.abril.com.br/wp-content/uploads/2021/07/Gabriel-Medina.jpeg', '2022-10-19 15:08:03.201505');
INSERT INTO public.users VALUES (2, 'Teste', 'teste@email.com', '1234', 'https://mulheresnacomputacao.files.wordpress.com/2015/01/3-pessoas-apontando-cc3a2mera.jpg', '2022-10-20 15:44:48.15413');
INSERT INTO public.users VALUES (3, 'claudio', 'teste2@email.com', '$2b$10$uEZZDmO8i4.IMmU.GoTBke72LfamCzbUrWYugK28ieMoDVYFRRwni', 'https://blog.unyleya.edu.br/wp-content/uploads/2017/12/saiba-como-a-educacao-ajuda-voce-a-ser-uma-pessoa-melhor.jpeg', '2022-10-21 10:57:37.233367');
INSERT INTO public.users VALUES (4, 'juninho', 'junior@gmail.com', '$2b$10$iFvs0ZVI7zVmvW5ZH97HbeuPsEq5JpilEV24JB8PhzIJIBTFD/0Ju', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2IBpiO_AVwErFJXlE_Hmwuq7iDlL1S4xCBYrgxOfp&s', '2022-10-21 16:30:33.767809');
INSERT INTO public.users VALUES (5, 'maisum', 'maisum@gmail.com', '$2b$10$W7CER6yKfrOx.DLoLvGEHunkVwh3YEjOXAPvLBZsnXav/JZtFNXsC', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2IBpiO_AVwErFJXlE_Hmwuq7iDlL1S4xCBYrgxOfp&s', '2022-10-21 16:40:53.337111');


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 1, true);


--
-- Name: hashtags_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_posts_id_seq', 1, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 222, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 105, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 33, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: hashtags_posts hashtags_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags_posts
    ADD CONSTRAINT hashtags_posts_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: hashtags_posts hashtags_posts_hashtag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags_posts
    ADD CONSTRAINT hashtags_posts_hashtag_id_fkey FOREIGN KEY (hashtag_id) REFERENCES public.hashtags(id);


--
-- Name: hashtags_posts hashtags_posts_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags_posts
    ADD CONSTRAINT hashtags_posts_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: likes likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: likes likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

