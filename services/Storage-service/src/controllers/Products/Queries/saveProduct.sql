INSERT INTO products(
    product_name,
    product_description,
    product_price,
    product_stock,
    pr_category_id,
    product_images
) VALUES(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
);