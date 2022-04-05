CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    productId INTEGER,
    quantity INTEGER NOT NULL,
    userId INTEGER,
    status VARCHAR(20) NOT NULL,

    FOREIGN KEY (productId) REFERENCES products(id),
    FOREIGN KEY (userId) REFERENCES users(id) 
);