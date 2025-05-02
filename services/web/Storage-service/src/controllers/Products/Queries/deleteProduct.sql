SELECT jsonb_agg(elem->>'path') AS paths
FROM (
  SELECT jsonb_array_elements(product_images) AS elem
  FROM products
  WHERE product_id = $1
) AS sub;


DELETE FROM products WHERE product_id = $1;