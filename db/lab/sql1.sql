#1. wypisz nazwy wszystkich tabeli
SHOW TABLES;

#2. wypisz tytuly filmow z dlugosciu wieksza niz 2 godziny
SELECT title FROM film WHERE length > 2 * 60;

#3. Wypisz tytuły 4 najkrótszych filmów o kategorii wiekowej PG-13.
SELECT * FROM film WHERE rating='PG-13' LIMIT 4; 

#4. Wypisz tytuły filmów oraz ich j˛ezyk, dla wszystkich filmów, w których opisie wyst˛epuje słowo Drama
SELECT f.title, l.name FROM film f JOIN language l 
ON (f.language_id = l.language_id)
WHERE f.description LIKE '%Drama%';

#5. Wypisz tytuły filmów z kategorii Family, które w swoim opisie zawieraj ˛a słowo Documentary.
SELECT f.title FROM film f 
JOIN film_category fc ON(f.film_id = fc.film_id)
JOIN  category c ON (c.category_id = fc.category_id)
WHERE description LIKE '%Documentary%' AND c.name = 'Family';

#6. Wypisz tytuły filmów z kategorii Children, które nie nalez ˛a do kategorii wiekowej ˙PG-13.
SELECT f.title FROM film f 
JOIN film_category fc ON(f.film_id = fc.film_id)
JOIN  category c ON (c.category_id = fc.category_id)
WHERE f.rating<>'PG-13' AND c.name = 'Children';

#7. Dla kazdej kategorii wiekowej filmów ˙ (G, PG-13, PG, NC-17, R) wypisz liczb˛e filmów do niej nalez ˛acych. 
SELECT rating, count(title) FROM film 
WHERE rating IN ('G', 'PG-13', 'PG', 'NC-17', 'R')
GROUP BY rating;

#8. Wypisz tytuły filmów wypozyczonych pomi˛edzy ˙ 31 maja a 30 czerwca 2005. Wyniki posortuj w odwrotnej kolejnosci alfabetycznej.
SELECT f.title FROM film f WHERE
EXISTS (SELECT i.film_id FROM inventory i JOIN rental r ON (i.inventory_id = r.inventory_id) 
	WHERE i.film_id = f.film_id AND r.rental_date BETWEEN '2005-05-31' AND '2005-06-30')
ORDER BY f.title;

#9. Wypisz imiona i nazwiska wszystkich aktorów, którzy wyst ˛apili w filmach zawieraj ˛acych usuni˛ete sceny
#????
SELECT first_name, last_name FROM actor a 
	WHERE EXISTS(SELECT 1 FROM film_actor fa JOIN film f ON (fa.film_id = f.film_id)
		WHERE a.actor_id = fa.actor_id AND f.replacement_cost > 0);

#10. Wypisz imiona oraz nazwiska wszystkich klientów, których wypozyczenie i odpowiadaj ˛aca ˙ mu płatnos´c były obsłu ´ zone przez 2 ró ˙ znych pracowników.
SELECT DISTINCT first_name, last_name FROM customer c
JOIN payment p ON (c.customer_id = p.customer_id)
JOIN rental r ON(p.rental_id = r.rental_id)
WHERE p.staff_id <> r.staff_id;

#or
SELECT first_name, last_name FROM customer c
WHERE c.customer_id IN 
	(SELECT DISTINCT r.customer_id FROM rental r JOIN payment p
	ON (r.rental_id = p.rental_id) WHERE p.staff_id <> r.staff_id);
    
#11. Wypisz imiona i nazwiska wszystkich klientów, którzy wypozyczyli wi˛ecej filmów ˙niz klient o e-mailu ˙ MARY.SMITH@sakilacustomer.org.
SELECT first_name, last_name FROM customer c JOIN rental r ON (c.customer_id = r.customer_id)
GROUP BY first_name, last_name
HAVING count(r.rental_id) > 
	(SELECT count(r.rental_id) FROM rental r JOIN customer c ON(r.customer_id = c.customer_id) 
    WHERE c.email = 'MARY.SMITH@sakilacustomer.org');
    
#12. Wypisz wszystkie pary aktorów, którzy wyst ˛apili razem w wi˛ecej niz jednym filmie. ˙Kazda para powinna wyst˛epowa ˙ c co najwy ´ zej raz. Je ˙ sli wyst˛epuje para (X, Y ), to ´ nie wypisuj pary (Y, X).
#???
SELECT a1.first_name, a1.last_name, a2.first_name, a2.last_name FROM actor a1 JOIN actor a2 ON a1.actor_id < a2.actor_id
	WHERE 
    (SELECT count(film_id) FROM film f WHERE 
		EXISTS (SELECT 1 FROM film_actor fa WHERE fa.film_id = f.film_id AND fa.actor_id = a1.actor_id ) AND
		EXISTS (SELECT 1 FROM film_actor fa WHERE fa.film_id = f.film_id AND fa.actor_id = a2.actor_id)
	) > 1;
    
#13. Wypisz nazwiska aktorów, którzy nie wyst ˛apili w zadnym filmie, którego tytuł zaczyna ˙si˛e liter ˛a C.
SELECT a.last_name FROM actor a WHERE 
	(SELECT count(title) FROM film f WHERE title LIKE 'C%' AND 
	a.actor_id IN (SELECT b.actor_id FROM film_actor b WHERE f.film_id = b.film_id)
    ) = 0;
    
#14. Wypisz nazwiska aktorów, którzy zagrali w wi˛ekszej liczbie horrorów niz filmów ˙akcji.
SELECT count(DISTINCT a.last_name) FROM actor a 
JOIN film_actor fa 
ON (fa.actor_id = a.actor_id)
WHERE
	(SELECT count(DISTINCT f.title) FROM film f
			JOIN film_category fc ON (fc.film_id = f.film_id)
			JOIN category c ON (c.category_id = fc.category_id)
			WHERE c.name = 'Horror' AND f.film_id = fa.film_id
        )
	>
    (SELECT (count(DISTINCT f.title)) FROM film f
			JOIN film_category fc ON (fc.film_id = f.film_id)
			JOIN category c ON (c.category_id = fc.category_id)
			WHERE c.name = 'ACtion' AND f.film_id = fa.film_id
        )
;

#15. Wypisz wszystkich klientów, których srednia opłata za wypo ´ zyczony film jest ni ˙ zsza ˙niz˙ srednia opłata dokonana 30 lipca 2005
SELECT c.customer_id FROM customer c JOIN payment p ON (c.customer_id = p.customer_id) 
GROUP BY c.customer_id
HAVING avg(p.amount) < 
	(SELECT avg(p2.amount) FROM payment p2 WHERE DATE_FORMAT(p2.payment_date, '%Y-%m-%d') = '2005-07-30');

#16. Zmien j˛ezyk filmu ´ YOUNG LANGUAGE na włoski
UPDATE film f SET language_id = (SELECT l.language_id FROM language l WHERE l.name = 'Italian')
	WHERE f.title = 'YOUNG LANGUAGE'; 
#to check
SELECT * FROM film WHERE title = 'YOUNG LANGUAGE';

#17 Dodaj do tabeli language j˛ezyk hiszpanski i zmie ´ n j˛ezyk wszystkich filmów, ´ w których wyst˛epuje ED CHASE na hiszpanski. 
SELECT * FROM language;
INSERT  INTO language (name) VALUES('Hispanic');

UPDATE film f SET 
	language_id = (SELECT language_id FROM language l WHERE l.name = 'Hispanic')
	WHERE EXISTS (SELECT a.first_name 
		FROM actor a JOIN film_actor fa ON (a.actor_id = fa.actor_id)
		WHERE fa.film_id = f.film_id AND concat(a.first_name, ' ', a.last_name) = 'ED CHASE');
SELECT * FROM film f WHERE  
	EXISTS (SELECT a.first_name FROM actor a JOIN film_actor fa ON (a.actor_id = fa.actor_id) 
    WHERE fa.film_id = f.film_id AND concat(a.first_name, ' ', a.last_name) = 'ED CHASE');
    
#18. Do tabeli language dodaj kolumn˛e films_no i uzupełnij j ˛a liczb ˛a filmów w danym j˛ezyku
ALTER TABLE language ADD COLUMN (films_no INT);
UPDATE language l SET films_no = (
	SELECT count(f.title) FROM film f 
    WHERE f.language_id = l.language_id
)
WHERE l.language_id > 0;

SELECT * FROM language;

#19. Usun kolumn˛e ´ release_year z tabeli film
ALTER TABLE film DROP COLUMN release_year;

