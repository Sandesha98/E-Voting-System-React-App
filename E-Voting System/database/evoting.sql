-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: evoting
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `Employee_id` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Post` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('INS-0001','admin','XYZ','CDC'),('INS-0002','admin2','ABC','DC');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidates`
--

DROP TABLE IF EXISTS `candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidates` (
  `candidate_id` int NOT NULL AUTO_INCREMENT,
  `picture` varchar(45) DEFAULT NULL,
  `cms_id` varchar(45) NOT NULL,
  `post_id` int NOT NULL,
  `panel_id` varchar(45) NOT NULL,
  PRIMARY KEY (`candidate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidates`
--

LOCK TABLES `candidates` WRITE;
/*!40000 ALTER TABLE `candidates` DISABLE KEYS */;
INSERT INTO `candidates` VALUES (1,'1675249943939.seconder.jpeg','021-19-0011',6,'021-19-0001'),(2,'1675249943938.treasurer.jpeg','021-19-0010',5,'021-19-0001'),(3,'1675249943937.pro.jpeg','021-19-0009',4,'021-19-0001'),(4,'1675512527720.VicePresident.jpeg','021-19-0022',2,'021-19-0001'),(5,'1675249943932.President.jpeg','021-19-0006',1,'021-19-0001'),(6,'1675249943936.GeneralSecretary.jpeg','021-19-0008',3,'021-19-0001'),(7,'1675249943944.proposer.jpeg','021-19-0001',7,'021-19-0001'),(8,'1675250138580.President.jpeg','021-19-0012',1,'021-19-0002'),(9,'1675250138581.VicePresident.jpeg','021-19-0013',2,'021-19-0002'),(10,'1675250138582.GeneralSecretary.jpeg','021-19-0014',3,'021-19-0002'),(11,'1675250138584.pro.jpeg','021-19-0015',4,'021-19-0002'),(12,'1675250138585.treasurer.jpeg','021-19-0016',5,'021-19-0002'),(13,'1675250138587.seconder.jpeg','021-19-0017',6,'021-19-0002'),(14,'1675250138590.proposer.jpeg','021-19-0002',7,'021-19-0002');
/*!40000 ALTER TABLE `candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manageelection`
--

DROP TABLE IF EXISTS `manageelection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manageelection` (
  `eid` int NOT NULL AUTO_INCREMENT,
  `startRegistration` tinyint DEFAULT NULL,
  `startVoting` tinyint DEFAULT NULL,
  `generateReport` tinyint DEFAULT NULL,
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manageelection`
--

LOCK TABLES `manageelection` WRITE;
/*!40000 ALTER TABLE `manageelection` DISABLE KEYS */;
INSERT INTO `manageelection` VALUES (1,0,0,1);
/*!40000 ALTER TABLE `manageelection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paneldetails`
--

DROP TABLE IF EXISTS `paneldetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paneldetails` (
  `panel_id` int NOT NULL AUTO_INCREMENT,
  `panelName` varchar(45) DEFAULT NULL,
  `symbol` varchar(45) DEFAULT NULL,
  `submittedBy` varchar(45) NOT NULL,
  `Status` varchar(45) NOT NULL,
  `feedback` longtext,
  `ApprovedBy` varchar(45) DEFAULT NULL,
  `electionYear` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`panel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paneldetails`
--

LOCK TABLES `paneldetails` WRITE;
/*!40000 ALTER TABLE `paneldetails` DISABLE KEYS */;
INSERT INTO `paneldetails` VALUES (1,'A','1675512625937.1.jpg','021-19-0001','Approved','','CDC','2023'),(2,'B','1675512657173.pic1.jpg','021-19-0002','Approved','','CDC','2023');
/*!40000 ALTER TABLE `paneldetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `postName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'President'),(2,'Vice President'),(3,'General Secretary'),(4,'P.R.O'),(5,'Treasurer'),(6,'Seconder'),(7,'Proposer');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `cms_id` varchar(45) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `fatherName` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `semester` int DEFAULT NULL,
  `cgpa` float DEFAULT NULL,
  `contact_num` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `fk_user_idx` (`cms_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'021-19-0001','Deepeka','Lakhmi chand','depeeka.bcss19@iba-suk.edu.pk','Computer Science',7,3.33,'03321233445'),(2,'021-19-0002','Priyanka','deepak kumar','priyanka@iba-suk.edu.pk','Business Administration',7,3.2,'03321233475'),(3,'021-19-0003','Naneeta','Mukesh kumar','naneeta@iba-suk.edu.pk','Computer Science',8,3.51,'03311233445'),(4,'021-19-0004','Ramsha ','Omparkash','ramsha@iba-suk.edu.pk','Business Administration',7,3.22,'03311226778'),(5,'021-19-0005','Chandni','Kirshan lal','chandni@iba-suk.edu.pk','Education',7,3.33,'03341223445'),(6,'021-19-0006','Usha','gurdas ram','usha@gmail.com','Electrical Engineering',6,3.22,'03113156354'),(7,'021-19-0007','Deepak ','parkash lal','deepak@gmail','Media Science',5,3.11,'03225676887'),(8,'021-19-0008','Akshay','Rajesh kumar','akshay@gmail.com','Electrical Engineering',3,3.22,'03328798990'),(9,'021-19-0009','Anish','Ramesh lal','anish@gmail.com','Computer Science',4,3.11,'03351228447'),(10,'021-19-0010','Sandhiya','Kishore kumar','sandhiya@gmail.com','Education',5,3.02,'03128965334'),(11,'021-19-0011','Sakshi','Amar lal','sakshi@gmail.com','Media Science',6,3.1,'03457687998'),(12,'021-19-0012','Laksh','Ajeet kumar','laksh@gmail.com','Computer Science',3,3.23,'03225676887'),(13,'021-19-0013','Junaid','Ajmal','junaid@iba-suk.edu.pk','Mathematics',4,3.01,'03248977666'),(14,'021-19-0014','Muhammad Qasim',' Shoaib Aziz','qasim@iba-suk.edu.pk','Mathematics',4,3.14,'03320990776'),(15,'021-19-0015','Ahmed Khan','Muhammad Akram','ahmed@gmail.com','Mathematics',5,3.16,'03218798776'),(16,'021-19-0016','Farhana Noor','Sain Bux','farhana@gmail.com','Mathematics',6,3.2,'03169845223'),(17,'021-19-0017','Abdul Shakoor','Muhammad Malook','shakoor@gmail.com','Education',6,3.11,'03205633876'),(18,'021-19-0018','Raheel Safdar','Safdar Bhatti','raheel.bcss19@iba-suk.edu.pk','Computer Science',6,3.12,'03326787998'),(19,'021-19-0019','Sunaina','Shewak ram','sunaina@gmail.com','Electrical Engineering',5,3.12,'03219866432'),(20,'021-19-0020','Sooraj','Parkash lal','sooraj@gmail.com','Business Administration',3,3.01,'03016755443'),(21,'021-19-0021','Adeel Ahmed','Shahmir Khan','adeel@gmail.com','Education',5,3.22,'03119865432'),(22,'021-19-0022','Shahryar','Aamir Ali','shahryar@gmail.com','Computer Science',4,3.17,'03182356098'),(23,'021-19-0023','Ume Hania','Kashif Ali','hania@gmail.com','Education',3,3.12,'03169874123'),(24,'021-19-0024','Quswah','Shahmir Khan','quswah@gmail.com','Mathematics',4,3.17,'03129023456'),(25,'021-19-0025','Salman Ahmed','Junaid Ahmed','salman@gmail.com','Media Science',5,3.12,'03122278554'),(26,'021-19-0026','Aqsa majeed','Abdul majeed','aqsa@iba-suk.edu.pk','Media Science',6,3.16,'03110976554'),(27,'021-19-0027','Madiha','Muhammad Aslam','madiha@gmail.com','Media Science',5,3.11,'03119856344'),(28,'021-19-0028','Kaneez fatima','Wahaj Abdullah','kaneez@gmail.com','Education',5,3.18,'03174534223'),(29,'021-19-0029','Sahil','Darshan lal','sahil@gmail.com','Business Administration',4,3.19,'03168390776'),(30,'021-19-0030','Kuldeep','Jai singh','kuldeep@gmail.com','Computer Science',6,3.33,'03180956443');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlogin`
--

DROP TABLE IF EXISTS `userlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlogin` (
  `cms_id` varchar(45) NOT NULL,
  `password` varchar(25) NOT NULL,
  PRIMARY KEY (`cms_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlogin`
--

LOCK TABLES `userlogin` WRITE;
/*!40000 ALTER TABLE `userlogin` DISABLE KEYS */;
INSERT INTO `userlogin` VALUES ('021-19-0001','0001'),('021-19-0002','0002'),('021-19-0003','0003'),('021-19-0004','0004'),('021-19-0005','0005'),('021-19-0006','0006'),('021-19-0007','0007'),('021-19-0008','0008'),('021-19-0009','0009'),('021-19-0010','0010'),('021-19-0011','0011'),('021-19-0012','0012'),('021-19-0013','0013'),('021-19-0014','0014'),('021-19-0015','0015'),('021-19-0016','0016'),('021-19-0017','0017'),('021-19-0018','0018'),('021-19-0019','0019'),('021-19-0020','0020'),('021-19-0021','0021'),('021-19-0022','0022'),('021-19-0023','0023'),('021-19-0024','0024'),('021-19-0025','0025'),('021-19-0026','0026'),('021-19-0027','0027'),('021-19-0028','0028'),('021-19-0029','0029'),('021-19-0030','0030');
/*!40000 ALTER TABLE `userlogin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-12 11:09:10
