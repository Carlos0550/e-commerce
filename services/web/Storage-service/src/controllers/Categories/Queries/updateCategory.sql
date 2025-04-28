UPDATE categories
SET category_name = $1
WHERE ct_manager_id = $2
AND category_id = $3;