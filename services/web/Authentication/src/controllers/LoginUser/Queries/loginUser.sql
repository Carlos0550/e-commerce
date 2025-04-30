SELECT COUNT(*) FROM managers WHERE manager_email = $1;

SELECT * FROM managers WHERE manager_email = $1;

UPDATE managers SET logged_at = $1 WHERE manager_email = $2;