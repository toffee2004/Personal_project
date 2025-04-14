-- Bảng thương hiệu sữa
CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    origin VARCHAR(100),
    website TEXT
);

-- Bảng danh mục sản phẩm
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Bảng sản phẩm sữa
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand_id INTEGER REFERENCES brands(id),
    category_id INTEGER REFERENCES categories(id),
    weight INTEGER, -- gram hoặc ml
    type VARCHAR(50), -- Ví dụ: bột, nước, thanh,...
    nutrition TEXT,
    description TEXT
);

-- Bảng cửa hàng bán sản phẩm
CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    website TEXT,
    address TEXT
);

-- Bảng giá sản phẩm tại các cửa hàng
CREATE TABLE prices (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    store_id INTEGER REFERENCES stores(id),
    price NUMERIC(10, 2) NOT NULL,
    date DATE DEFAULT CURRENT_DATE
);

-- Bảng người dùng
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from brands
-- Thêm danh mục
INSERT INTO categories (name) VALUES ('Sữa tươi'), ('Sữa bột');

-- Thêm thương hiệu
INSERT INTO brands (name, origin, website)
VALUES ('Vinamilk', 'Việt Nam', 'https://www.vinamilk.com.vn'),
       ('TH True Milk', 'Việt Nam', 'https://www.thmilk.vn');

-- Thêm sản phẩm
INSERT INTO products (name, brand_id, category_id, weight, type, nutrition)
VALUES ('Vinamilk Dinh Dưỡng 180ml', 1, 1, 180, 'nước', 'Canxi, Vitamin A, D3'),
       ('TH True Milk Ít Đường 1L', 2, 1, 1000, 'nước', 'Vitamin D, Canxi');

-- Thêm cửa hàng
INSERT INTO stores (name, website, address)
VALUES ('Tiki', 'https://tiki.vn', 'TP. HCM'),
       ('Lazada', 'https://www.lazada.vn', 'Hà Nội');

-- Thêm giá sản phẩm
INSERT INTO prices (product_id, store_id, price)
VALUES (1, 1, 6500),
       (2, 2, 28000);

-- Thêm người dùng
INSERT INTO users (username, email, password_hash)
VALUES ('admin', 'admin@example.com', 'hash_password_here');
