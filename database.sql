
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" serial primary key,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(1000) NOT NULL,
	"is_admin" BOOLEAN DEFAULT false NOT NULL,
    "company_id" int DEFAULT 1 REFERENCES companies(id) NOT NULL,
    "isdeleted" BOOLEAN DEFAULT FALSE NOT NULL
);

-- create table "customers"
CREATE TABLE "customers" (
	"id" serial primary key,
	"first_name" varchar(20) NOT NULL,
	"last_name" varchar(20) NOT NULL,
	"address" varchar(30) NOT NULL,
	"city" varchar(20) NOT NULL,
	"state" varchar(20) NOT NULL,
	"zip" BIGINT NOT NULL,
	"email" varchar(40),
	"phone" BIGINT NOT NULL,
    "isdeleted" BOOLEAN DEFAULT FALSE NOT NULL
);

-- create table "services"
CREATE TABLE "services" (
	"id" serial primary key,
	"service" varchar(30) NOT NULL,
    "isdeleted" BOOLEAN DEFAULT FALSE NOT NULL
);

-- create table "invoice"
CREATE TABLE invoice (
    "id" serial primary key,
    "user_id" INT REFERENCES "user"(id) NOT NULL,
    "date_issued" DATE NOT NULL,
    "date_paid" DATE,
    "total_price" DECIMAL,
    "customer_id" INT REFERENCES customers(id) NOT NULL
);

-- create table line_item
CREATE TABLE line_item (
    "id" serial primary key,
    "service_id" INT REFERENCES services(id) NOT NULL,
    "date_performed" DATE NOT NULL,
    "service_price" DECIMAL NOT NULL,
    "invoice_id" INT REFERENCES invoice(id)
);

CREATE TABLE "companies" (
	"id" serial primary key,
	"company_name" varchar(50) NOT NULL,
	"address" varchar(30) NOT NULL,
	"city" varchar(20) NOT NULL,
	"state" varchar(20) NOT NULL,
	"zip" BIGINT NOT NULL,
	"email" varchar(40),
	"phone" BIGINT NOT NULL,
    "url" varchar(500)
);   

-- Insert users into the "customers" table
INSERT INTO customers ("first_name", "last_name", "address", "city", "state", "zip", "email", "phone")
VALUES
    ('John', 'Doe', '123 Main St', 'Fargo', 'ND', 58103, 'john.doe@email.com', 1234567890),
    ('Jane', 'Smith', '456 Elm St', 'Moorhead', 'MN', 56560, 'jane.smith@email.com', 9876543210),
    ('Bob', 'Johnson', '789 Oak St', 'West Fargo', 'ND', 58078, 'bob.johnson@email.com', 5551234567),
    ('Alice', 'Williams', '101 Pine St', 'Fargo', 'ND', 58102, 'alice@email.com', 9998887777),
    ('Brent', 'Olson', '1345 Main St', 'Fargo', 'ND', 58103, 'jane.smith@email.com', 9876543210),
    ('Jeff', 'Jackson', '1002 Oak St', 'Moorhead', 'MN', 56560, 'bob.johnson@email.com', 5551234567),
    ('Brittany', 'Williamson', '408 Pine St', 'West Fargo', 'ND', 58078, 'alice@email.com', 9998887777),
    ('David', 'Brown', '567 Willow St', 'Fargo', 'ND', 58104, 'david.brown@email.com', 8887776666),
	('Sarah', 'Miller', '789 Oakwood Ave', 'Fargo', 'ND', 58103, 'sarah.miller@email.com', 7776665555),
	('Michael', 'Wilson', '1010 Birch Ln', 'Fargo', 'ND', 58102, 'michael.wilson@email.com', 6665554444),
	('Emily', 'Anderson', '321 Cedar Dr', 'Fargo', 'ND', 58104, 'emily.anderson@email.com', 5554443333),
	('Robert', 'Martinez', '456 Pine Cone Rd', 'Fargo', 'ND', 58103, 'robert.martinez@email.com', 4443332222),
    ('Robert', 'Miller', '789 Oak St', 'Fargo', 'ND', 58103, 'robert@example.com', 5552468137, FALSE),
    ('Susan', 'Brown', '101 Pine St', 'Fargo', 'ND', 58103, 'susan@example.com', 5553692581, FALSE),
    ('Michael', 'Williams', '234 Birch St', 'Fargo', 'ND', 58103, 'michael@example.com', 5551357924, FALSE),
    ('Jennifer', 'Jones', '567 Willow St', 'Fargo', 'ND', 58103, 'jennifer@example.com', 5557894561, FALSE),
    ('William', 'Davis', '890 Cedar St', 'Moorhead', 'MN', 56560, 'william@example.com', 5552589637, FALSE),
    ('Nancy', 'Miller', '123 Spruce St', 'Moorhead', 'MN', 56560, 'nancy@example.com', 5551236987, FALSE),
    ('James', 'Wilson', '456 Maple St', 'Moorhead', 'MN', 56560, 'james@example.com', 5559871234, FALSE),
    ('Linda', 'Martinez', '789 Pine St', 'Moorhead', 'MN', 56560, 'linda@example.com', 5553698741, FALSE),
    ('David', 'Garcia', '101 Oak St', 'Moorhead', 'MN', 56560, 'david@example.com', 5557856321, FALSE),
    ('Patricia', 'Lee', '234 Birch St', 'West Fargo', 'ND', 58078, 'patricia@example.com', 5551597536, FALSE),
    ('Richard', 'Hernandez', '567 Elm St', 'West Fargo', 'ND', 58078, 'richard@example.com', 5553659872, FALSE),
    ('Mary', 'Walker', '890 Oak St', 'West Fargo', 'ND', 58078, 'mary@example.com', 5554563219, FALSE),
    ('George', 'Young', '123 Maple St', 'West Fargo', 'ND', 58078, 'george@example.com', 5552587413, FALSE),
    ('Karen', 'Scott', '456 Cedar St', 'West Fargo', 'ND', 58078, 'karen@example.com', 5559871236, FALSE),
    ('Charles', 'Green', '789 Willow St', 'Fargo', 'ND', 58103, 'charles@example.com', 5556325871, FALSE),
    ('Betty', 'Adams', '101 Elm St', 'Moorhead', 'MN', 56560, 'betty@example.com', 5551478523, FALSE),
    ('Lisa', 'Perez', '234 Cedar St', 'Fargo', 'ND', 58103, 'lisa@example.com', 5559874561, FALSE),
    ('Daniel', 'Hall', '567 Spruce St', 'West Fargo', 'ND', 58078, 'daniel@example.com', 5556325879, FALSE);

-- Insert users into the "services" table    
INSERT INTO services ("service") VALUES ('Weekly Mow and Trim'), ('Spring Clean-up'), ('Fall Clean-up'), ('Aeration'), ('Dethatching'), ('One-Time Mow and Trim');

-- FOR UPDATING TOTAL PRICE IN INVOICE TABLE
-- Create a function to update total_price
CREATE OR REPLACE FUNCTION update_invoice_total_price()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql; 

-- Create a trigger to call the function after INSERT or UPDATE on line_item
CREATE TRIGGER update_invoice_total_price_trigger
AFTER INSERT OR UPDATE OR DELETE ON line_item
FOR EACH ROW
EXECUTE FUNCTION update_invoice_total_price();


INSERT INTO line_item ("service_id", "date_performed", "service_price", "invoice_id")
VALUES
    ((SELECT id FROM services WHERE "service" = 'Weekly Mow and Trim'), '2023-10-05', 50.00, 1),
    ((SELECT id FROM services WHERE "service" = 'Spring Clean-up'), '2023-10-20', 75.00, 1),
    ((SELECT id FROM services WHERE "service" = 'Weekly Mow and Trim'), '2023-10-12', 50.00, 1),
    ((SELECT id FROM services WHERE "service" = 'Fall Clean-up'), '2023-10-22', 60.00, 2),
    ((SELECT id FROM services WHERE "service" = 'Weekly Mow and Trim'), '2023-10-02', 50.00, 3),
    ((SELECT id FROM services WHERE "service" = 'Spring Clean-up'), '2023-10-14', 75.00, 4),
    ((SELECT id FROM services WHERE "service" = 'Weekly Mow and Trim'), '2023-10-10', 50.00, 3),
    ((SELECT id FROM services WHERE "service" = 'Weekly Mow and Trim'), '2023-10-16', 50.00, 3),
    ((SELECT id FROM services WHERE "service" = 'Weekly Mow and Trim'), '2023-10-24', 50.00, 3),
    ((SELECT id FROM services WHERE "service" = 'Weekly Mow and Trim'), '2023-10-05', 50.00, 75),
    ((SELECT id FROM services WHERE "service" = 'Spring Clean-up'), '2023-10-20', 75.00, 75),
    ((SELECT id FROM services WHERE "service" = 'Weekly Mow and Trim'), '2023-10-12', 50.00, 75),
    ((SELECT id FROM services WHERE "service" = 'Fall Clean-up'), '2023-10-22', 60.00, 76),
    ((SELECT id FROM services WHERE "service" = 'Weekly Mow and Trim'), '2023-10-02', 50.00, 79),
    ((SELECT id FROM services WHERE "service" = 'Spring Clean-up'), '2023-10-14', 75.00, 79),
    ((SELECT id FROM services WHERE "service" = 'Weekly Mow and Trim'), '2023-10-10', 50.00, 80),
    ((SELECT id FROM services WHERE "service" = 'Weekly Mow and Trim'), '2023-10-16', 50.00, 82),
    ((SELECT id FROM services WHERE "service" = 'Weekly Mow and Trim'), '2023-10-24', 50.00, 83);

    -- this gets each customer id in one column and then all the
-- customer info into an object in the next column
SELECT
    id,
    json_build_object(
        'first_name', first_name,
        'last_name', last_name,
        'address', address,
        'city', city,
        'state', state,
        'zip', zip,
        'email', email,
        'phone', phone
    ) AS customer_data
FROM customers;

-- ARRAY OF OBJECTS with key value pairs with service, price, and date
SELECT i.id AS invoice_id,
       json_agg(json_build_object('type', s.service, 'date', li.date_performed, 'price', li.service_price )) AS service_data,
       i.total_price,
       i.customer_id,
       c.first_name,
       c.last_name,
       c.address,
       c.city,
       c.state,
       c.zip,
       c.email,
       c.phone
FROM invoice i
LEFT JOIN line_item li ON i.id = li.invoice_id
LEFT JOIN services AS s ON li.service_id = s.id
LEFT JOIN customers AS c ON i.customer_id = c.id
GROUP BY i.id, i.total_price, i.customer_id, c.first_name, c.last_name, c.address, c.city, c.state, c.zip, c.email, c.phone;