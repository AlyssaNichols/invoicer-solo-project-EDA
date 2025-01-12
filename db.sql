--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Homebrew)
-- Dumped by pg_dump version 14.9 (Homebrew)

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

--
-- Name: update_invoice_total_price(); Type: FUNCTION; Schema: public; Owner: alyssanichols
--

CREATE FUNCTION public.update_invoice_total_price() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Update total_price when a new line item is inserted or an existing one is updated
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE invoice AS i
        SET total_price = (
            SELECT COALESCE(SUM(service_price), 0)
            FROM line_item AS li
            WHERE li.invoice_id = i.id
        )
        WHERE i.id = NEW.invoice_id;
    -- Update total_price when a line item is deleted
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE invoice AS i
        SET total_price = (
            SELECT COALESCE(SUM(service_price), 0)
            FROM line_item AS li
            WHERE li.invoice_id = i.id
        )
        WHERE i.id = OLD.invoice_id;
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_invoice_total_price() OWNER TO alyssanichols;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: alyssanichols
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    company_name character varying(50) NOT NULL,
    address character varying(30) NOT NULL,
    city character varying(20) NOT NULL,
    state character varying(20) NOT NULL,
    zip bigint NOT NULL,
    email character varying(40),
    phone bigint NOT NULL,
    url character varying(10000),
    isdeleted boolean DEFAULT false
);


ALTER TABLE public.companies OWNER TO alyssanichols;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: alyssanichols
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO alyssanichols;

--
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alyssanichols
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: alyssanichols
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    first_name character varying(20) NOT NULL,
    last_name character varying(20) NOT NULL,
    address character varying(30) NOT NULL,
    city character varying(20) NOT NULL,
    state character varying(20) NOT NULL,
    zip bigint NOT NULL,
    email character varying(40),
    phone bigint NOT NULL,
    isdeleted boolean DEFAULT false
);


ALTER TABLE public.customers OWNER TO alyssanichols;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: alyssanichols
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO alyssanichols;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alyssanichols
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: invoice; Type: TABLE; Schema: public; Owner: alyssanichols
--

CREATE TABLE public.invoice (
    id integer NOT NULL,
    user_id integer NOT NULL,
    date_issued date NOT NULL,
    date_paid date,
    total_price numeric,
    customer_id integer NOT NULL,
    isdeleted boolean DEFAULT false
);


ALTER TABLE public.invoice OWNER TO alyssanichols;

--
-- Name: invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: alyssanichols
--

CREATE SEQUENCE public.invoice_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.invoice_id_seq OWNER TO alyssanichols;

--
-- Name: invoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alyssanichols
--

ALTER SEQUENCE public.invoice_id_seq OWNED BY public.invoice.id;


--
-- Name: line_item; Type: TABLE; Schema: public; Owner: alyssanichols
--

CREATE TABLE public.line_item (
    id integer NOT NULL,
    service_id integer NOT NULL,
    date_performed date NOT NULL,
    service_price numeric NOT NULL,
    invoice_id integer,
    isdeleted boolean DEFAULT false
);


ALTER TABLE public.line_item OWNER TO alyssanichols;

--
-- Name: line_item_id_seq; Type: SEQUENCE; Schema: public; Owner: alyssanichols
--

CREATE SEQUENCE public.line_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.line_item_id_seq OWNER TO alyssanichols;

--
-- Name: line_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alyssanichols
--

ALTER SEQUENCE public.line_item_id_seq OWNED BY public.line_item.id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: alyssanichols
--

CREATE TABLE public.services (
    id integer NOT NULL,
    service character varying(30) NOT NULL,
    isdeleted boolean DEFAULT false
);


ALTER TABLE public.services OWNER TO alyssanichols;

--
-- Name: services_id_seq; Type: SEQUENCE; Schema: public; Owner: alyssanichols
--

CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.services_id_seq OWNER TO alyssanichols;

--
-- Name: services_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alyssanichols
--

ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: alyssanichols
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(80) NOT NULL,
    password character varying(1000) NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    company_id integer,
    isdeleted boolean DEFAULT false
);


ALTER TABLE public."user" OWNER TO alyssanichols;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: alyssanichols
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO alyssanichols;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alyssanichols
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: invoice id; Type: DEFAULT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.invoice ALTER COLUMN id SET DEFAULT nextval('public.invoice_id_seq'::regclass);


--
-- Name: line_item id; Type: DEFAULT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.line_item ALTER COLUMN id SET DEFAULT nextval('public.line_item_id_seq'::regclass);


--
-- Name: services id; Type: DEFAULT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: alyssanichols
--

COPY public.companies (id, company_name, address, city, state, zip, email, phone, url, isdeleted) FROM stdin;
1	Grassmasters	2407 34th Ave S	Fargo	ND	58104	grassmastersfargo@gmail.com	7013715514	Logo.jpg	f
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: alyssanichols
--

COPY public.customers (id, first_name, last_name, address, city, state, zip, email, phone, isdeleted) FROM stdin;
26	William	Davis	890 Cedar St	Moorhead	MN	56560	william@example.com	2185448789	f
28	James	Wilson	456 Maple St	Moorhead	MN	56560	james@example.com	2185673819	f
29	Linda	Martinez	789 Pine St	Moorhead	MN	56560	linda@example.com	2182348789	f
27	Nancy	Miller	123 Spruce St	Moorhead	MN	56560	nancy@example.com	2185649223	f
9	Sarah	Miller	789 Oakwood Ave	Fargo	ND	58103	sarah.miller@email.com	7013675498	f
23	Susan	Brown	101 Pine St	Fargo	ND	58103	susan@example.com	7013675811	f
24	Michael	Williams	234 Birch St	Fargo	ND	58103	michael@example.com	7013676223	f
22	Robert	Miller	789 Oak St	Fargo	ND	58103	robert@example.com	7013715498	f
6	Jeff	Jackson	1002 Oak St	Moorhead	MN	56560	jeff.jackson@email.com	5551234567	f
11	Emily	Anderson	321 Evergreen Dr	Fargo	ND	58104	emily.anderson@email.com	7012221010	f
25	Jennifer	Jones	567 Willow St	Fargo	ND	58103	jennifer@example.com	7013675680	f
1	John	Doe	123 Main St	Fargo	ND	58103	john.doe@email.com	1234567890	f
49	Sophie	Andrews	1234 Main Street	Fargo	ND	58103	sophieandrews@email.com	7015554324	f
4	Alice	Williams	101 Pine St	Fargo	ND	58102	alice@email.com	9998887777	f
3	Bob	Johnson	789 Oak St	West Fargo	ND	58078	bob.johnson@email.com	5551234567	f
8	David	Brown	567 Willow St	Fargo	ND	58104	david.brown@email.com	8887776666	f
5	Brent	Olson	1345 Main St	Fargo	ND	58103	brent.olson@email.com	9876543210	f
2	Jane	Smith	456 Elm St	Moorhead	MN	56560	jane.smith@email.com	9876543210	f
38	Lisa	Perez	234 Cedar St	Fargo	ND	58103	lisa@example.com	7012321565	f
39	Daniel	Hall	567 Spruce St	West Fargo	ND	58078	daniel@example.com	7012321234	f
30	David	Garcia	101 Oak St	Moorhead	MN	56560	david@example.com	2181348789	f
32	Richard	Hernandez	567 Elm St	West Fargo	ND	58078	richard@example.com	7012359300	f
33	Mary	Walker	890 Oak St	West Fargo	ND	58078	mary@example.com	7012351293	f
35	Karen	Scott	456 Cedar St	West Fargo	ND	58078	karen@example.com	7012358593	f
36	Charles	Green	789 Willow St	Fargo	ND	58103	charles@example.com	7012329834	f
48	Kenny	Ferguson	1234 Main Street	Fargo	ND	58104	kenny@email.com	7015551234	f
34	George	Young	123 Maple St	West Fargo	ND	58078	george@example.com	7012358501	f
41	Alyssa	Nichols	1234	Fargo	ND	58104	alyssa.s.nichols94@gmail.com	7013671677	f
45	Brittany	Nichols	1234	FARGO	ND	58104		7014293120	f
31	Patricia	Lee	234 Birch St	West Fargo	ND	58078	patricia@example.com	7012358593	f
37	Betty	Adamson	101 Elm Street	Fargo	ND	58103	bettyadamson@example.com	2182221195	f
\.


--
-- Data for Name: invoice; Type: TABLE DATA; Schema: public; Owner: alyssanichols
--

COPY public.invoice (id, user_id, date_issued, date_paid, total_price, customer_id, isdeleted) FROM stdin;
85	1	2023-09-29	\N	200	11	f
114	1	2023-10-30	\N	275	49	f
96	1	2023-10-24	\N	130	32	f
101	1	2023-08-31	\N	140	31	f
83	1	2023-10-31	\N	200.00	11	f
94	1	2023-07-31	\N	220	45	f
103	1	2023-09-29	\N	275	4	f
104	1	2023-07-28	\N	180	33	f
79	1	2023-10-30	\N	325.00	8	f
93	1	2023-08-31	\N	200	2	f
74	1	2023-10-30	\N	270.00	1	f
75	1	2023-10-30	\N	240.00	2	f
105	1	2023-07-31	\N	240	36	f
106	1	2023-08-31	\N	210	9	f
110	1	2023-08-31	2023-09-04	250	11	t
95	1	2023-08-31	2023-09-04	150	39	t
98	1	2023-10-30	2023-10-25	100	30	f
107	1	2023-09-29	\N	420	28	f
108	1	2023-06-30	\N	620	45	t
\.


--
-- Data for Name: line_item; Type: TABLE DATA; Schema: public; Owner: alyssanichols
--

COPY public.line_item (id, service_id, date_performed, service_price, invoice_id, isdeleted) FROM stdin;
212	1	2023-07-26	40	94	f
213	1	2023-08-09	50	95	f
146	1	2023-10-09	50	83	f
214	1	2023-08-16	50	95	f
215	1	2023-08-28	50	95	f
216	1	2023-08-29	50	93	f
145	1	2023-10-03	50	83	f
217	2	2023-10-03	50	96	f
224	1	2023-10-09	50	98	f
223	1	2023-10-02	50	98	f
226	1	2023-10-11	40	96	f
225	1	2023-10-23	40	96	f
229	1	2023-08-01	35	101	f
230	1	2023-08-08	35	101	f
231	1	2023-08-15	35	101	f
129	1	2023-10-10	50.00	74	f
130	1	2023-10-16	50.00	74	f
131	1	2023-10-24	50.00	74	f
232	1	2023-08-22	35	101	f
133	1	2023-10-10	50.00	79	f
134	1	2023-10-16	50.00	79	f
233	1	2023-09-19	100	103	f
234	1	2023-09-08	175	103	f
235	4	2023-07-04	140	104	f
236	1	2023-07-18	40	104	f
237	2	2023-07-05	140	105	f
173	1	2023-10-05	50.00	75	f
238	1	2023-07-18	50	105	f
239	1	2023-07-25	50	105	f
177	1	2023-10-02	50.00	79	f
240	1	2023-08-09	35	106	f
241	1	2023-08-02	35	106	f
242	1	2023-08-16	140	106	f
182	1	2023-10-05	50.00	75	f
243	1	2023-09-01	140	107	f
184	1	2023-10-12	50.00	75	f
244	1	2023-09-19	140	107	f
245	1	2023-06-06	140	108	f
190	1	2023-10-24	50.00	83	f
246	1	2023-06-13	140	108	f
147	1	2023-10-17	50	83	f
247	11	2023-06-01	200	108	f
192	3	2023-10-30	175	79	f
193	3	2023-10-26	120	74	f
194	3	2023-10-24	90	75	f
248	1	2023-06-27	140	108	f
204	1	2023-08-03	50	93	f
205	1	2023-08-10	50	93	f
206	1	2023-08-17	50	93	f
208	4	2023-07-03	100	94	f
209	1	2023-07-10	40	94	f
210	1	2023-07-18	40	94	f
197	1	2023-09-14	50	85	f
198	1	2023-09-19	50	85	f
199	1	2023-09-29	50	85	f
253	1	2023-09-06	50	85	f
262	1	2023-09-30	140	107	f
252	1	2023-08-01	50	110	t
254	1	2023-08-08	50	110	t
255	1	2023-08-15	50	110	t
256	1	2023-08-22	50	110	t
257	1	2023-08-29	50	110	t
269	1	2023-10-02	50	114	f
270	1	2023-10-09	50	114	f
271	3	2023-10-16	175	114	f
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: alyssanichols
--

COPY public.services (id, service, isdeleted) FROM stdin;
2	Spring Clean-up	f
3	Fall Clean-up	f
1	Weekly Mow and Trim	f
4	Aeration	f
11	Dethatching	f
21	One-Time-Mow	t
22	One time mow	t
23	One time mow	t
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: alyssanichols
--

COPY public."user" (id, username, password, is_admin, company_id, isdeleted) FROM stdin;
1	carisa	$2a$10$HgtzrpyAG2CvB2TvoOPHLu2vRQd3X.p0w15LETQZtzaM5x1yWji4.	t	1	f
3	alyssa	$2a$10$8frYsoFeHoIKKn6nu1CR4ut1XmzMmE5KQ877QtXPPEIxqlTmlXA/6	f	1	f
19	grassmasters	$2a$10$tN6ZQujLBC18EnoH2w9gtukAsOU40iWOWLE8rIqcOEcNiArrk.FNu	t	1	f
20	carisanichols	$2a$10$qNQA5me51h1O8.cUhrARZeN2a4hf49vEVhwHOZWNs/Z189KZwzE1W	t	\N	f
2	rodger	$2a$10$xsJG3qQu6b.IIGA0bPtt2OcUOR.bmH6EZvdeHin9I8EvfGH6MWvJW	f	1	f
4	preston	1234	f	1	f
\.


--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alyssanichols
--

SELECT pg_catalog.setval('public.companies_id_seq', 2, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alyssanichols
--

SELECT pg_catalog.setval('public.customers_id_seq', 49, true);


--
-- Name: invoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alyssanichols
--

SELECT pg_catalog.setval('public.invoice_id_seq', 114, true);


--
-- Name: line_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alyssanichols
--

SELECT pg_catalog.setval('public.line_item_id_seq', 271, true);


--
-- Name: services_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alyssanichols
--

SELECT pg_catalog.setval('public.services_id_seq', 23, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alyssanichols
--

SELECT pg_catalog.setval('public.user_id_seq', 20, true);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: invoice invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (id);


--
-- Name: line_item line_item_pkey; Type: CONSTRAINT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.line_item
    ADD CONSTRAINT line_item_pkey PRIMARY KEY (id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user user_username_key; Type: CONSTRAINT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_username_key UNIQUE (username);


--
-- Name: line_item update_invoice_total_price_trigger; Type: TRIGGER; Schema: public; Owner: alyssanichols
--

CREATE TRIGGER update_invoice_total_price_trigger AFTER INSERT OR DELETE OR UPDATE ON public.line_item FOR EACH ROW EXECUTE FUNCTION public.update_invoice_total_price();


--
-- Name: line_item fk_invoice_id; Type: FK CONSTRAINT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.line_item
    ADD CONSTRAINT fk_invoice_id FOREIGN KEY (invoice_id) REFERENCES public.invoice(id) ON DELETE CASCADE;


--
-- Name: invoice invoice_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id);


--
-- Name: invoice invoice_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: line_item line_item_invoice_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.line_item
    ADD CONSTRAINT line_item_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES public.invoice(id);


--
-- Name: line_item line_item_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: alyssanichols
--

ALTER TABLE ONLY public.line_item
    ADD CONSTRAINT line_item_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id);


--
-- PostgreSQL database dump complete
--

