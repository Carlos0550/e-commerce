SELECT 
    (SELECT category_name FROM categories WHERE category_id = p.pr_category_id) AS pr_category_name,
    p.product_id,
    p.product_name,
    p.product_description,
    p.product_price,
    p.product_stock,
    p.product_images -> 0 AS product_images,
    p.pr_category_id as product_category
FROM products p
ORDER BY p.product_id DESC;
    
SELECT product_images FROM products WHERE product_id = $1;