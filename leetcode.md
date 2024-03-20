### Note

[COALESCE](https://www.w3schools.com/sql/func_mysql_coalesce.asp) 回傳第一個非 NULL 的值
[HAVING](https://www.w3schools.com/sql/sql_having.asp) : WHERE無法用於 aggregate functions ( AVG()、COUNT()、MAX()、MIN()、SUM() 等 )

---

#### [180. Consecutive Numbers](https://leetcode.com/problems/consecutive-numbers/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT DISTINCT c.num AS ConsecutiveNums
FROM (
  SELECT id, 
    num, 
    LEAD(num, 1)OVER() AS num2, 
    LEAD(num, 2)OVER() AS num3
  FROM Logs
) c
WHERE c.num = c.num2 AND c.num2 = c.num3
```
[LEAD](https://www.begtut.com/mysql/mysql-lead-function.html)

<br/>



#### [185. Department Top Three Salaries](https://leetcode.com/problems/department-top-three-salaries/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT d.name AS Department, 
e.name AS employee, 
e.salary AS Salary
FROM Employee e
LEFT JOIN Department d
ON e.departmentId = d.id
WHERE e.id IN (
  SELECT r.id
  FROM (
    SELECT e2.id,
    DENSE_RANK() OVER(
    PARTITION BY departmentId
    ORDER BY departmentId, salary DESC
    ) AS ranking
    FROM Employee e2
  ) r
  WHERE r.ranking <=3
)
#ORDER BY e.departmentId, e.salary DESC
```
```sql
SELECT Department, Employee, Salary
FROM (
  SELECT 
    d.name AS Department,
    e.name AS Employee,
    e.salary AS Salary,
    DENSE_RANK() OVER (PARTITION BY d.name ORDER BY Salary DESC) AS rnk
  FROM Employee e
  JOIN Department d
  ON e.departmentId = d.id
) AS rnk_tbl
WHERE rnk <= 3
```
```sql
# 直接數同部門中有幾人薪水更高
SELECT d.name AS Department, 
e1.name AS Employee, 
e1.salary AS Salary 
FROM Employee e1 
INNER JOIN Department d 
ON e1.departmentId = d.id 
WHERE 3 > (
  SELECT COUNT(DISTINCT(e2.Salary)) 
  FROM Employee e2 
  WHERE e2.Salary > e1.Salary AND 
  e1.departmentId = e2.departmentId
)
```
[Window Function (PARTITION BY, RNAK, DENSE RANK...)](https://haosquare.com/sql-window-function-intro/)
<br/>



#### [197. Rising Temperature](https://leetcode.com/problems/rising-temperature/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT w1.id FROM `Weather` w1
INNER JOIN `Weather` w2
ON w1.recordDate = DATE_ADD(w2.recordDate, INTERVAL 1 DAY)
WHERE w1.temperature > w2.temperature
```
<br/>



#### [550. Game Play Analysis IV](https://leetcode.com/problems/game-play-analysis-iv/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [570. Managers with at Least 5 Direct Reports](https://leetcode.com/problems/managers-with-at-least-5-direct-reports/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [577. Employee Bonus](https://leetcode.com/problems/employee-bonus/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [584. Find Customer Referee](https://leetcode.com/problems/find-customer-referee/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [585. Investments in 2016](https://leetcode.com/problems/investments-in-2016/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM Insurance i1
WHERE tiv_2015 IN (
  SELECT tiv_2015 FROM Insurance i2
  WHERE i1.pid != i2.pid
)
AND (lat, lon) NOT IN (
  SELECT lat, lon FROM Insurance i3
  WHERE i1.pid != i3.pid
)
```
```sql
SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM Insurance
WHERE tiv_2015 IN (
  SELECT tiv_2015
  FROM Insurance
  GROUP BY tiv_2015
  HAVING COUNT(pid) > 1
)
AND (lat, lon) IN (
  SELECT lat, lon
  FROM Insurance
  GROUP BY lat, lon
  HAVING COUNT(pid) = 1
)
```
<br/>



#### [595. Big Countries](https://leetcode.com/problems/big-countries/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT `name`, `population`, `area` FROM `World`
WHERE `area` >= 3000000 # 或用 HAVING
  OR `population` >=25000000;
```
<br/>



#### [596. Classes More Than 5 Students](https://leetcode.com/problems/classes-more-than-5-students/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(student) >= 5;


SELECT class
FROM (
  SELECT class, COUNT(student) AS amount
  FROM Courses
  GROUP BY class
) student_amount
WHERE amount >= 5
```
<br/>



#### [602. Friend Requests II: Who Has the Most Friends](https://leetcode.com/problems/friend-requests-ii-who-has-the-most-friends/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT id, SUM(num) AS num
FROM (
  SELECT requester_id AS id,
  COUNT(requester_id) AS num
  FROM RequestAccepted
  GROUP BY id
  UNION ALL
  SELECT accepter_id AS id, 
  COUNT(accepter_id) AS num
  FROM RequestAccepted
  GROUP BY id
) t
GROUP BY id
ORDER BY num DESC
LIMIT 1
```
<br/>



#### [610. Triangle Judgement](https://leetcode.com/problems/triangle-judgement/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT *,
  CASE WHEN x + y > z
    AND y + z > x
    AND z + x > y
    THEN "Yes"
    ELSE "No"
  END AS triangle
FROM Triangle
```
<br/>



#### [619. Biggest Single Number](https://leetcode.com/problems/biggest-single-number/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT MAX(num) AS num
FROM (
  SELECT num
  FROM MyNumbers
  GROUP BY num
  HAVING COUNT(num) = 1
) singleNum
```
<br/>



#### [620. Not Boring Movies](https://leetcode.com/problems/not-boring-movies/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT id, movie, description, rating
FROM Cinema
WHERE id % 2 = 1 # or HAVING
  AND description != 'boring'
ORDER BY rating DESC
```
<br/>



#### [626. Exchange Seats](https://leetcode.com/problems/exchange-seats/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT CASE 
  WHEN id % 2 AND id = (SELECT MAX(id) FROM Seat) THEN id
  WHEN id % 2 THEN id + 1
  ELSE id - 1 END
AS id,
student
FROM Seat
ORDER BY id
```
<br/>



#### [1045. Customers Who Bought All Products](https://leetcode.com/problems/customers-who-bought-all-products/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT customer_id
FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (
  SELECT COUNT(product_key) AS amount
  FROM Product
)
```
<br/>



#### [1068. Product Sales Analysis I](https://leetcode.com/problems/product-sales-analysis-i/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1070. Product Sales Analysis III](https://leetcode.com/problems/product-sales-analysis-iii/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT product_id,
  year AS first_year,
  quantity,
  price
FROM Sales
WHERE (product_id, year) IN (
  SELECT product_id, MIN(year)
  FROM Sales
  GROUP BY product_id
)
```
<br/>



#### [1075. Project Employees I](https://leetcode.com/problems/project-employees-i/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1141. User Activity for the Past 30 Days I](https://leetcode.com/problems/user-activity-for-the-past-30-days-i/description/?envType=study-plan-v2&envId=top-sql-50)

* 

```sql
SELECT activity_date AS day,
  COUNT(DISTINCT user_id) AS active_users
FROM Activity
WHERE activity_date > "2019-06-27"
  AND activity_date <= "2019-07-27"
GROUP BY activity_date

SELECT activity_date AS day,
  COUNT(DISTINCT user_id) AS active_users
FROM Activity
WHERE activity_date BETWEEN DATE_SUB('2019-07-27', INTERVAL 29 DAY) AND '2019-07-27'
GROUP BY activity_date
```
<br/>



#### [1148. Article Views I](https://leetcode.com/problems/article-views-i/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1164. Product Price at a Given Date](https://leetcode.com/problems/product-price-at-a-given-date/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT product_id, new_price AS price
FROM Products
WHERE (product_id, change_date) IN (
  SELECT product_id,
  MAX(change_date)
  FROM Products
  WHERE change_date <= "2019-08-16"
  GROUP BY product_id
) 
UNION
SELECT product_id, 10
FROM Products
WHERE Product_id NOT IN (
  SELECT DISTINCT product_id
  FROM Products
  WHERE change_date <= "2019-08-16"
)
```
```sql
SELECT DISTINCT product_id,
  COALESCE((SELECT new_price FROM (
    SELECT * FROM products p3 
    WHERE change_date <= '2019-08-16' 
      AND p3.product_id = p2.product_id
  ) p1
  ORDER BY change_date DESC LIMIT 1), 10) AS price
FROM products p2;
```
<br/>



#### [1174. Immediate Food Delivery II](https://leetcode.com/problems/immediate-food-delivery-ii/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1193. Monthly Transactions I](https://leetcode.com/problems/monthly-transactions-i/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1204. Last Person to Fit in the Bus](https://leetcode.com/problems/last-person-to-fit-in-the-bus/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT person_name
FROM (
  SELECT person_name,
  SUM(weight) OVER(ORDER BY turn) AS accu_weight
  FROM Queue
  ORDER BY accu_weight DESC
) accu
WHERE accu.accu_weight <= 1000
LIMIT 1
```
```sql
SELECT q1.person_name
FROM Queue q1 JOIN Queue q2 ON q1.turn >= q2.turn
GROUP BY q1.turn
HAVING SUM(q2.weight) <= 1000
ORDER BY SUM(q2.weight) DESC
LIMIT 1
```
<br/>



#### [1211. Queries Quality and Percentage](https://leetcode.com/problems/queries-quality-and-percentage/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1251. Average Selling Price](https://leetcode.com/problems/average-selling-price/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1280. Students and Examinations](https://leetcode.com/problems/students-and-examinations/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1321. Restaurant Growth](https://leetcode.com/problems/restaurant-growth/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT visited_on,
  (
    SELECT SUM(amount)
    FROM customer
    WHERE visited_on BETWEEN DATE_SUB(c.visited_on, INTERVAL 6 DAY) AND c.visited_on
  ) AS amount,
  ROUND((
    SELECT SUM(amount) / 7
    FROM customer
    WHERE visited_on BETWEEN DATE_SUB(c.visited_on, INTERVAL 6 DAY) AND c.visited_on), 2
  ) AS average_amount
FROM customer c
WHERE visited_on >= (
  SELECT DATE_ADD(MIN(visited_on), INTERVAL 6 DAY)
  FROM customer
  ) # 6天前有資料
GROUP BY visited_on
```
<br/>



#### [1341. Movie Rating](https://leetcode.com/problems/movie-rating/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
(SELECT u.name AS results
FROM MovieRating mr
LEFT JOIN Users u
USING(user_id)
GROUP BY mr.user_id
ORDER BY COUNT(mr.movie_id) DESC, u.name
LIMIT 1)

UNION ALL

(SELECT m.title AS results
FROM MovieRating mr
LEFT JOIN Movies m
USING(movie_id)
WHERE DATE_FORMAT(created_at, "%Y-%m") = "2020-02"
GROUP BY mr.movie_id
ORDER BY AVG(rating) DESC, title
LIMIT 1)
```
<br/>


#### [1378. Replace Employee ID With The Unique Identifier](https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1527. Patients With a Condition](https://leetcode.com/problems/patients-with-a-condition/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT *
FROM Patients
WHERE conditions LIKE "DIAB1%" 
  OR conditions LIKE "% DIAB1%"
```
```sql
SELECT * 
FROM Patients 
WHERE conditions REGEXP "\\bDIAB1"
# \b 表示文字/數字的邊界
```
[\b](https://stackoverflow.com/questions/6664151/difference-between-b-and-b-in-regex)
<br/>



#### [1581. Customer Who Visited but Did Not Make Any Transactions](https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1633. Percentage of Users Attended a Contest](https://leetcode.com/problems/percentage-of-users-attended-a-contest/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1661. Average Time of Process per Machine](https://leetcode.com/problems/average-time-of-process-per-machine/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1667. Fix Names in a Table](https://leetcode.com/problems/fix-names-in-a-table/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT user_id,
CONCAT(
  UCASE(LEFT(name, 1)), LCASE(SUBSTRING(name, 2)) # or UPPER, LOWER
) AS name
FROM Users
ORDER BY user_id
```
<br/>



#### [1683. Invalid Tweets](https://leetcode.com/problems/invalid-tweets/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1729. Find Followers Count](https://leetcode.com/problems/find-followers-count/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT user_id,
  COUNT(user_id) AS followers_count
FROM Followers
GROUP BY user_id
ORDER BY user_id
```
<br/>



#### [1731. The Number of Employees Which Report to Each Employee](https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT DISTINCT manager.employee_id,
  manager.name,
  COUNT(manager.employee_id) AS reports_count,
  ROUND(AVG(reporter.age) , 0) AS average_age
FROM Employees reporter
INNER JOIN  Employees manager
ON reporter.reports_to = manager.employee_id
GROUP BY manager.employee_id
ORDER BY manager.employee_id
```
<br/>



#### [1757. Recyclable and Low Fat Products](https://leetcode.com/problems/recyclable-and-low-fat-products/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT `product_id` FROM `Products`
WHERE `low_fats` = 'Y' AND `recyclable` = 'Y';
```
<br/>



#### [1789. Primary Department for Each Employee](https://leetcode.com/problems/primary-department-for-each-employee/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT employee_id, department_id 
FROM Employee
WHERE primary_flag = "Y"
OR employee_id IN (
  SELECT employee_id
  FROM Employee
  GROUP BY employee_id
  HAVING COUNT(employee_id) = 1
)
```
<br/>



#### [1907. Count Salary Categories](https://leetcode.com/problems/count-salary-categories/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT "Low Salary" AS category,
  SUM(income < 20000) AS accounts_count
FROM Accounts
UNION
SELECT "Average Salary",
  SUM(income >= 20000 AND income <= 50000) 
  AS accounts_count
FROM Accounts
UNION
SELECT "High Salary",
  SUM(income >50000) 
  AS accounts_count
FROM Accounts
```
[UNION ALL](https://www.w3schools.com/sql/sql_ref_union_all.asp)
<br/>



#### [1934. Confirmation Rate](https://leetcode.com/problems/confirmation-rate/description/?envType=study-plan-v2&envId=top-sql-50)

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



#### [1978. Employees Whose Manager Left the Company](https://leetcode.com/problems/employees-whose-manager-left-the-company/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT reporter.employee_id
FROM Employees reporter
LEFT JOIN Employees manager
ON reporter.manager_id = manager.employee_id
WHERE reporter.salary < 30000
  AND reporter.manager_id IS NOT NULL
  AND manager.employee_id IS NULL
ORDER BY reporter.employee_id
```
```sql
SELECT employee_id
FROM Employees
WHERE salary < 30000
AND manager_id NOT IN (
  SELECT employee_id FROM Employees
)
ORDER BY employee_id
```
<br/>



#### [2356. Number of Unique Subjects Taught by Each Teacher](https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT teacher_id, COUNT(DISTINCT subject_id) AS cnt
FROM Teacher
GROUP BY teacher_id
```
<br/>