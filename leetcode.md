###Note

[COALESCE](https://www.w3schools.com/sql/func_mysql_coalesce.asp) 回傳第一個非 NULL 的值
[HAVING](https://www.w3schools.com/sql/sql_having.asp) : WHERE無法用於 aggregate functions ( AVG()、COUNT()、MAX()、MIN()、SUM() 等 )

---

####[197. Rising Temperature](https://leetcode.com/problems/rising-temperature/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT w1.id FROM `Weather` w1
INNER JOIN `Weather` w2
ON w1.recordDate = DATE_ADD(w2.recordDate, INTERVAL 1 DAY)
WHERE w1.temperature > w2.temperature
```
<br/>



####[550. Game Play Analysis IV](https://leetcode.com/problems/game-play-analysis-iv/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
# not pass QQ
SELECT ROUND(AVG(day2 IS NOT null), 2) AS fraction
FROM (
    SELECT a1.player_id, a1.event_date, a2.event_date AS day2
    FROM Activity a1
    LEFT JOIN Activity a2
    ON a1.player_id = a2.player_id
    AND a2.event_date = DATE_ADD(a1.event_date, INTERVAL 1 DAY)
    GROUP BY player_id
) AS data
```
```sql
SELECT
  ROUND(COUNT(DISTINCT player_id) / (SELECT COUNT(DISTINCT player_id) FROM Activity), 2) AS fraction
FROM Activity
WHERE
  (player_id, DATE_SUB(event_date, INTERVAL 1 DAY))
  IN (
    SELECT player_id, MIN(event_date) AS first_login 
    FROM Activity 
    GROUP BY player_id
  )
```
<br/>



####[570. Managers with at Least 5 Direct Reports](https://leetcode.com/problems/managers-with-at-least-5-direct-reports/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT managers.name
FROM Employee managers
LEFT JOIN Employee reports # INNER JOIN
  ON managers.id = reports.managerId
GROUP BY managers.id
HAVING COUNT(reports.managerId) >= 5
```
```sql
# another way using 'IN'
SELECT name 
FROM Employee 
WHERE id IN (
    SELECT managerId 
    FROM Employee 
    GROUP BY managerId 
    HAVING COUNT(*) >= 5)
```
<br/>



####[577. Employee Bonus](https://leetcode.com/problems/employee-bonus/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT e.name, b.bonus FROM Employee e
LEFT JOIN Bonus b
USING (empId) # Don't forget ()
WHERE COALESCE(b.bonus, 0) < 1000


SELECT e.name, b.bonus FROM Employee e
LEFT JOIN Bonus b
ON e.empId = b.empId
WHERE COALESCE(b.bonus, 0) < 1000
```
<br/>



####[584. Find Customer Referee](https://leetcode.com/problems/find-customer-referee/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT `name` FROM `Customer`
WHERE `referee_id` IS NULL 
  OR `referee_id` != 2;
```
```sql
# another query using COALESCE
SELECT `name` FROM `Customer`
WHERE COALESCE(`referee_id`, 0) != 2;
```
<br/>



####[595. Big Countries](https://leetcode.com/problems/big-countries/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT `name`, `population`, `area` FROM `World`
WHERE `area` >= 3000000 # 或用 HAVING
  OR `population` >=25000000;
```
<br/>



####[620. Not Boring Movies](https://leetcode.com/problems/not-boring-movies/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT id, movie, description, rating
FROM Cinema
WHERE id % 2 = 1 # or HAVING
  AND description != 'boring'
ORDER BY rating DESC
```
<br/>



####[1068. Product Sales Analysis I](https://leetcode.com/problems/product-sales-analysis-i/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT `product_name`, `year`, `price` FROM `Sales`
LEFT JOIN `Product`
ON `Sales`.`product_id` = `Product`.`product_id`
```
```sql
SELECT `product_name`, `year`, `price` FROM `Sales`
LEFT JOIN `Product`
USING (`product_id`)
```
<br/>



####[1075. Project Employees I](https://leetcode.com/problems/project-employees-i/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT project_id, 
  ROUND(AVG(experience_years), 2) AS average_years
FROM Project p
LEFT JOIN Employee e
USING (employee_id)
GROUP BY project_id
```
<br/>



####[1148. Article Views I](https://leetcode.com/problems/article-views-i/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT `author_id` AS `id` FROM `Views`
WHERE author_id = viewer_id
GROUP BY `id`
ORDER BY `id`
```
```sql
SELECT DISTINCT `author_id` AS `id` FROM `Views`
WHERE `id` = `viewer_id`
ORDER BY `id`
```
<br/>



####[1174. Immediate Food Delivery II](https://leetcode.com/problems/immediate-food-delivery-ii/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT ROUND(AVG(order_date = customer_pref_delivery_date)*100, 2)
  AS immediate_percentage
FROM Delivery
WHERE (customer_id, order_date) IN (
  SELECT customer_id,
    MIN(order_date)
  FROM Delivery
  GROUP BY customer_id
)
```
[IN (SELECT)](https://www.w3schools.com/sql/sql_in.asp)
<br/>



####[1193. Monthly Transactions I](https://leetcode.com/problems/monthly-transactions-i/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT DATE_FORMAT(trans_date, "%Y-%m") AS month,
  country,
  COUNT(id) AS trans_count,
  SUM(state = "approved") AS approved_count,
  SUM(amount) AS trans_total_amount,
  SUM(CASE WHEN state = "approved" then amount else 0 END) AS approved_total_amount
FROM `Transactions`
GROUP BY month, country
```
<br/>



####[1211. Queries Quality and Percentage](https://leetcode.com/problems/queries-quality-and-percentage/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
# rating < 3 is boolean, and can be counted by SUM()
SELECT query_name,
  ROUND(AVG(rating / position), 2) AS quality,
  ROUND(SUM(rating < 3) * 100 / COUNT(query_name), 2)
  AS poor_query_percentage
FROM Queries
WHERE query_name IS NOT NULL
GROUP BY query_name
```
<br/>



####[1251. Average Selling Price](https://leetcode.com/problems/average-selling-price/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT p.product_id , 
  COALESCE(ROUND(SUM(price * units)/SUM(units), 2), 0) AS average_price
FROM Prices p
LEFT JOIN UnitsSold u
ON p.product_id = u.product_id 
  AND p.start_date <= u.purchase_date 
  AND u.purchase_date <= p.end_date
GROUP BY p.product_id
```
<br/>



####[1280. Students and Examinations](https://leetcode.com/problems/students-and-examinations/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT st.student_id, st.student_name, sub.subject_name,
  COUNT(e.subject_name) AS attended_exams
FROM Students st
CROSS JOIN Subjects sub
LEFT JOIN Examinations e 
  ON st.student_id = e.student_id
  AND sub.subject_name = e.subject_name
GROUP BY student_id, subject_name
ORDER BY student_id, subject_name
```
<br/>


####[1378. Replace Employee ID With The Unique Identifier](https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT `unique_id`, `name` FROM `Employees`
LEFT JOIN `EmployeeUNI`
USING (`id`)
```
```sql
SELECT `unique_id`, `name` FROM `Employees`
LEFT JOIN `EmployeeUNI`
ON `Employees`.`id` = `EmployeeUNI`.`id`
```
<br/>



####[1581. Customer Who Visited but Did Not Make Any Transactions](https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT v.customer_id , COUNT(v.visit_id) AS count_no_trans 
FROM Visits v
LEFT JOIN Transactions t
ON v.visit_id = t.visit_id
WHERE t.transaction_id IS NULL
GROUP BY v.customer_id

# Wrong!!!
SELECT v.customer_id , COUNT(v.visit_id) AS count_no_trans 
FROM Visits v
LEFT JOIN Transactions t
ON v.visit_id = t.visit_id
WHERE t.amount IS NULL # May error when 1 visitor have several transactions
GROUP BY v.customer_id
```
[Note](https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/solutions/3500258/full-explanation-unlike-any-others-where-they-only-provide-the-solution)
<br/>

```sql
SELECT customer_id, COUNT(visit_id) as count_no_trans 
FROM Visits
WHERE visit_id NOT IN (
	SELECT visit_id FROM Transactions
	)
GROUP BY customer_id
```
```sql
SELECT customer_id, COUNT(visit_id) as count_no_trans 
FROM Visits v
WHERE NOT EXISTS (
	SELECT visit_id FROM Transactions t 
	WHERE t.visit_id = v.visit_id
	)
GROUP BY customer_id
```
<br/>



####[1633. Percentage of Users Attended a Contest](https://leetcode.com/problems/percentage-of-users-attended-a-contest/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT contest_id,
  ROUND(COUNT(contest_id)*100/(SELECT COUNT(user_id)FROM Users),2)
  AS percentage # COUNT(DISTINCT user_id)*100/... is better
FROM Register 
GROUP BY contest_id
ORDER BY percentage DESC, contest_id ASC
```
<br/>



####[1661. Average Time of Process per Machine](https://leetcode.com/problems/average-time-of-process-per-machine/description/?envType=study-plan-v2&envId=top-sql-50)

* Datebase

```sql
SELECT a1.machine_id, 
  ROUND(AVG(a2.timestamp-a1.timestamp), 3) AS processing_time 
FROM Activity a1
INNER JOIN Activity a2
ON a1.machine_id = a2.machine_id
  AND a1.process_id = a2.process_id
  AND a1.activity_type = 'start'
  AND a2.activity_type = 'end'
GROUP BY a1.machine_id
```
做成這樣方便用AVG()
| machine_id | process_id | activity_type | timestamp | activity_type | timestamp |
| ---------- | ---------- | ------------- | --------- | ------------- | --------- |
| 0          | 0          | start         | 0.712     | end           | 1.52      |
| 1          | 0          | start         | 0.55      | end           | 1.55      |
| 2          | 0          | start         | 4.1       | end           | 4.512     |

<br/>



####[1683. Invalid Tweets](https://leetcode.com/problems/invalid-tweets/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT `tweet_id` FROM
  (SELECT `tweet_id`, Length(content) FROM `Tweets`
  WHERE Length(content) > 15) AS `filtered_tweets`
```
```sql
SELECT `tweet_id` FROM `Tweets`
WHERE Length(content) > 15
```
<br/>



####[1757. Recyclable and Low Fat Products](https://leetcode.com/problems/recyclable-and-low-fat-products/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT `product_id` FROM `Products`
WHERE `low_fats` = 'Y' AND `recyclable` = 'Y';
```
<br/>



####[1934. Confirmation Rate](https://leetcode.com/problems/confirmation-rate/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT s.user_id ,
  ROUND(AVG(IF(c.action = 'confirmed', 1, 0)), 2) 
  AS confirmation_rate
FROM Signups s
LEFT JOIN Confirmations c
  USING(user_id)
GROUP BY c.user_id
```
<br/>