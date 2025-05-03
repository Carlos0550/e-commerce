SELECT
  (SELECT allow_to_administrate FROM managers WHERE manager_email = $1) AS allow_to_administrate,
  (SELECT COUNT(*) FROM managers WHERE manager_email = $1) AS count;

SELECT * FROM managers WHERE manager_email = $1;

UPDATE managers SET logged_at = $1 WHERE manager_email = $2;