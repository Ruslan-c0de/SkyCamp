-- 1. Знайти топ-3 покупців за сумою замовлень
SELECT Customers.CustomerName, SUM((Products.Price * OrderDetails.Quantity)), OrderDetails.OrderID 
FROM Customers 
INNER JOIN Orders ON Orders.CustomerID = Customers.CustomerID
INNER JOIN OrderDetails ON OrderDetails.OrderID = Orders.OrderID
INNER JOIN Products ON OrderDetails.ProductID = Products.ProductID
GROUP BY OrderDetails.OrderID 
ORDER BY SUM((Products.Price * OrderDetails.Quantity)) DESC LIMIT 3


-- 2. Знайти топ-3 покупців за кількістю замовлень
SELECT Customers.CustomerName, Orders.CustomerID as id, count(Orders.OrderID) as numberOfOrders
FROM Orders
INNER JOIN Customers ON Customers.CustomerID = id
GROUP BY Orders.CustomerID
order by numberOfOrders desc limit 3


-- 3. Знайти найдорожче замовлення
SELECT Customers.CustomerName, SUM((Products.Price * OrderDetails.Quantity)), OrderDetails.OrderID, Orders.CustomerID, 
Orders.EmployeeID, Orders.OrderDate, Orders.ShipperID
FROM Customers 
INNER JOIN Orders ON Orders.CustomerID = Customers.CustomerID
INNER JOIN OrderDetails ON OrderDetails.OrderID = Orders.OrderID
INNER JOIN Products ON OrderDetails.ProductID = Products.ProductID
GROUP BY OrderDetails.OrderID 
ORDER BY SUM((Products.Price * OrderDetails.Quantity)) DESC LIMIT 1


-- 4. Знайти середню вартість замовлення в категорії “Meat/Poultry”
SELECT Products.ProductName, AVG(Products.Price)
FROM Categories
INNER JOIN Products ON Products.CategoryID = Categories.CategoryID
WHERE Categories.CategoryID = 6