--Solo elimina una imagen y actualiza el producto--
UPDATE products 
SET product_images = (
    SELECT jsonb_agg(elem)
    FROM jsonb_array_elements(product_images) AS elem
    WHERE elem ->> 'path' <> ALL ($1::text[])
),
product_name = $2,
product_description = $3,
product_price = $4,
product_stock = $5,
pr_category_id = $6
WHERE product_id = $7;


--Elimina y inserta (actualiza) imagenes--
UPDATE products 
SET product_images = (
  SELECT jsonb_agg(final_elem)
  FROM (
    SELECT elem AS final_elem
    FROM jsonb_array_elements(product_images) AS elem
    WHERE elem ->> 'path' <> ALL ($1::text[])

    UNION ALL

    SELECT new_elem AS final_elem
    FROM jsonb_array_elements($2::jsonb) AS new_elem
  ) AS all_elems
),
product_name = $3,
product_description = $4,
product_price = $5,
product_stock = $6,
pr_category_id = $7
WHERE product_id = $8;


--CLiente actualiza y inserta imagenes (no elimina nada)--
UPDATE products 
SET product_images = (
    SELECT jsonb_agg(final_elem)
    FROM (
        SELECT existing_elem AS final_elem
        FROM jsonb_array_elements(product_images) AS existing_elem
        
        UNION ALL
        
        SELECT new_elem AS final_elem
        FROM jsonb_array_elements($1::jsonb) AS new_elem
    ) AS all_elems
),
product_name = $2,
product_description = $3,
product_price = $4,
product_stock = $5,
pr_category_id = $6
WHERE product_id = $7;


--Cliente no actualiza ni elimina imagenes--
UPDATE products 
SET product_name = $1,
product_description = $2,
product_price = $3,
product_stock = $4,
pr_category_id = $5
WHERE product_id = $6;