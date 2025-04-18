DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Cart;

CREATE TABLE Users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    userLevel TEXT NOT NULL,
    token TEXT
);

CREATE TABLE Products (
    itemId INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    imageURL TEXT,
    description TEXT,
    unitPrice INTEGER NOT NULL,
    category TEXT NOT NULL
);

CREATE TABLE Cart (
    userId INTEGER NOT NULL,
    itemId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    PRIMARY KEY(userId, itemId),
    FOREIGN KEY (userId) REFERENCES Users(userId),
    FOREIGN KEY (itemId) REFERENCES Products(itemId)
);


insert into Users(username, password, userLevel) values('testAdmin', 'password', 'admin');

insert into Products(name, imageURL, description, unitPrice, category) values('RTX 5090', 'https://assets.nvidia.partners/images/png/RTX5090-3QTR-Back-Right.png', 'Introducing the NVIDIA GeForce RTX 5090 — the next generation of ultimate performance. Powered by cutting-edge Ada Lovelace 2.0 architecture, the RTX 5090 delivers unprecedented AI-driven graphics, lightning-fast ray tracing, and extreme 4K+ gaming.',1939.00, 'gpu')
