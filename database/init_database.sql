-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: 127.0.0.1    Database: ourpooltable
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `inf_req_log`
--

DROP TABLE IF EXISTS `inf_req_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `inf_req_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `req` varchar(1000) NOT NULL,
  `req_ts` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_clubs`
--

DROP TABLE IF EXISTS `t_clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `t_clubs` (
  `c_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `c_name` varchar(45) NOT NULL,
  `c_description` varchar(45) DEFAULT NULL,
  `c_initiator` int(11) NOT NULL,
  `c_ts_insert` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `c_ts_update` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`c_id`),
  UNIQUE KEY `c_id_UNIQUE` (`c_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_notification_messages`
--

DROP TABLE IF EXISTS `t_notification_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `t_notification_messages` (
  `n_m_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `n_m_userid` int(11) NOT NULL,
  `n_m_nid` int(11) NOT NULL,
  `n_m_sended` int(1) NOT NULL DEFAULT '0',
  `n_m_ts_insert` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `n_m_ts_update` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`n_m_id`),
  UNIQUE KEY `n_m_id_UNIQUE` (`n_m_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_notification_types`
--

DROP TABLE IF EXISTS `t_notification_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `t_notification_types` (
  `n_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `n_disc` varchar(45) NOT NULL,
  PRIMARY KEY (`n_id`),
  UNIQUE KEY `n_id_UNIQUE` (`n_id`),
  UNIQUE KEY `n_discShort_UNIQUE` (`n_disc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_rel_club_tables`
--

DROP TABLE IF EXISTS `t_rel_club_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `t_rel_club_tables` (
  `rel_id` int(11) unsigned NOT NULL,
  `rel_club_id` int(11) NOT NULL,
  `rel_table_id` int(11) NOT NULL,
  `rel_ts_insert` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rel_ts_update` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rel_id`),
  UNIQUE KEY `rel_id_UNIQUE` (`rel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_rel_user_clubs`
--

DROP TABLE IF EXISTS `t_rel_user_clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `t_rel_user_clubs` (
  `rel_id` int(11) unsigned NOT NULL,
  `rel_user_id` int(11) NOT NULL,
  `rel_club_id` int(11) NOT NULL,
  `rel_ts_insert` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rel_ts_update` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rel_id`),
  UNIQUE KEY `rel_id_UNIQUE` (`rel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_tables`
--

DROP TABLE IF EXISTS `t_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `t_tables` (
  `t_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `t_c_id` int(11) NOT NULL,
  `t_name` varchar(45) NOT NULL,
  `t_ts_insert` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `t_ts_update` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`t_id`),
  UNIQUE KEY `t_id_UNIQUE` (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_users`
--

DROP TABLE IF EXISTS `t_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `t_users` (
  `u_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `u_name` varchar(45) NOT NULL,
  `u_password` varchar(100) NOT NULL,
  `u_mail` varchar(45) NOT NULL,
  `u_ts_insert` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `u_ts_update` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `u_active` int(1) DEFAULT '0',
  `u_registration_key` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_id_UNIQUE` (`u_id`),
  UNIQUE KEY `u_nickname_UNIQUE` (`u_name`),
  UNIQUE KEY `u_contact_mail_UNIQUE` (`u_mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'ourpooltable'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-29 13:02:04
