SELECT
  COUNT(*) FILTER (WHERE manager_email = $1)   AS count,
  COUNT(*)                                     AS masters_count
FROM managers;


INSERT INTO managers(
    manager_name,
    manager_email,
    manager_password,
    is_master,allow_to_administrate
) VALUES (
    $1,
    $2,
    $3,
    $4, $5
);