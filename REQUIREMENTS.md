# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `api/products` [GET] [token required]
- Show `api/products/:id` [GET] [token required]
- Create `api/products` [POST] [token required]

#### Users

- Index `api/users/:id` [GET] [token required]
- Show `api/users` [GET] [token required]
- Create `api/users` [POST]

#### Orders

- Current Order by user (args: user id)[token required]
- show `api/orders` [GET] [token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Data Shapes

#### Product

Table: _products_

- id `SERIAL PRIMARY KEY`
- name `VARCHAR`
- price `INTEGER`

#### User

Table: _users_

- id `SERIAL PRIMARY KEY`
- firstname `VARCHAR`
- lastname `VARCHAR`
- passwordt `VARCHAR`

#### Orders

Table: _orders_

- id `SERIAL PRIMARY KEY`
- userid `INTEGER` `REFERENCES users(id)`
- status `BOOLEAN`

Table: _order_products_

- order_id `INTEGER` `REFERENCES orders(id)`
- product_id `INTEGER` `REFERENCES products(id)`
- quantity `INTEGER`
