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



####[1068. Product Sales Analysis I](https://leetcode.com/problems/product-sales-analysis-i/description/?envType=study-plan-v2&envId=top-sql-50)

* Database

```sql
SELECT `product_name`, `year`, `price` FROM `Sales`
LEFT JOIN `Product`
USING (`product_id`)
```
```sql
SELECT `product_name`, `year`, `price` FROM `Sales`
LEFT JOIN `Product`
ON `Sales`.`product_id` = `Product`.`product_id`
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
SELECT DISTINCT `author_id` `id` FROM `Views`
WHERE `id` = `viewer_id`
ORDER BY `id`
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
WHERE t.amount IS NULL # Sometimes wrong
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