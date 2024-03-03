###Note

[COALESCE](https://www.w3schools.com/sql/func_mysql_coalesce.asp) 回傳第一個非 NULL 的值
[HAVING](https://www.w3schools.com/sql/sql_having.asp) : WHERE無法用於 aggregate functions ( AVG()、COUNT()、MAX()、MIN()、SUM() 等 )

---

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
```sql
SELECT `name`, `population`, `area` FROM `World`
WHERE `area` >= 3000000 # 或用 HAVING
  OR `population` >=25000000;
```
<br/>

####[1683. Invalid Tweets](https://leetcode.com/problems/invalid-tweets/description/?envType=study-plan-v2&envId=top-sql-50)
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

####[1148. Article Views I](https://leetcode.com/problems/article-views-i/description/?envType=study-plan-v2&envId=top-sql-50)
```sql
SELECT `author_id` `id` FROM `Views`
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

####[1757. Recyclable and Low Fat Products](https://leetcode.com/problems/recyclable-and-low-fat-products/?envType=study-plan-v2&envId=top-sql-50)
* Database
```sql
SELECT `product_id` FROM `Products`
WHERE `low_fats` = 'Y' AND `recyclable` = 'Y';
```