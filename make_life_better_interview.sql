/*
 Navicat Premium Data Transfer

 Source Server         : DOCKER
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3307
 Source Schema         : make_life_better_interview

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 13/01/2023 15:02:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for seminar_speakers
-- ----------------------------
DROP TABLE IF EXISTS `seminar_speakers`;
CREATE TABLE `seminar_speakers` (
  `seminarSpeakerId` int NOT NULL AUTO_INCREMENT,
  `seminarId` int DEFAULT NULL,
  `speakerId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`seminarSpeakerId`),
  KEY `seminarId` (`seminarId`),
  KEY `speakerId` (`speakerId`),
  CONSTRAINT `seminar_speakers_ibfk_7` FOREIGN KEY (`seminarId`) REFERENCES `seminars` (`seminarId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `seminar_speakers_ibfk_8` FOREIGN KEY (`speakerId`) REFERENCES `speakers` (`speakerId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of seminar_speakers
-- ----------------------------
BEGIN;
INSERT INTO `seminar_speakers` (`seminarSpeakerId`, `seminarId`, `speakerId`, `createdAt`, `updatedAt`) VALUES (1, 5, 1, '2023-01-13 07:59:05', '2023-01-13 07:59:05');
COMMIT;

-- ----------------------------
-- Table structure for seminars
-- ----------------------------
DROP TABLE IF EXISTS `seminars`;
CREATE TABLE `seminars` (
  `seminarId` int NOT NULL AUTO_INCREMENT,
  `seminarType` enum('OFFLINE','ONLINE') DEFAULT NULL,
  `toppics` text,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `seminarUrl` text,
  `dateFrom` datetime DEFAULT NULL,
  `dateTo` datetime DEFAULT NULL,
  `haveFee` tinyint(1) DEFAULT NULL,
  `fee` double DEFAULT NULL,
  `breakfast` tinyint(1) DEFAULT NULL,
  `lunch` tinyint(1) DEFAULT NULL,
  `dinner` tinyint(1) DEFAULT NULL,
  `remark` text,
  `status` enum('ACTIVE','INACTIVE','DELETED') DEFAULT 'ACTIVE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `location` text,
  PRIMARY KEY (`seminarId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of seminars
-- ----------------------------
BEGIN;
INSERT INTO `seminars` (`seminarId`, `seminarType`, `toppics`, `latitude`, `longitude`, `seminarUrl`, `dateFrom`, `dateTo`, `haveFee`, `fee`, `breakfast`, `lunch`, `dinner`, `remark`, `status`, `createdAt`, `updatedAt`, `location`) VALUES (2, 'ONLINE', 'string', 0, 0, 'https://www.google.com', '2023-01-12 15:05:10', '2023-01-12 15:05:10', 0, 0, 1, 1, 1, 'string', 'ACTIVE', '2023-01-12 16:49:45', '2023-01-12 16:49:45', NULL);
INSERT INTO `seminars` (`seminarId`, `seminarType`, `toppics`, `latitude`, `longitude`, `seminarUrl`, `dateFrom`, `dateTo`, `haveFee`, `fee`, `breakfast`, `lunch`, `dinner`, `remark`, `status`, `createdAt`, `updatedAt`, `location`) VALUES (3, 'ONLINE', 'string', 0, 0, 'https://www.google.com', '2023-01-12 15:05:10', '2023-01-12 15:05:10', 0, 0, 1, 1, 1, 'string', 'ACTIVE', '2023-01-12 16:52:19', '2023-01-12 16:52:19', NULL);
INSERT INTO `seminars` (`seminarId`, `seminarType`, `toppics`, `latitude`, `longitude`, `seminarUrl`, `dateFrom`, `dateTo`, `haveFee`, `fee`, `breakfast`, `lunch`, `dinner`, `remark`, `status`, `createdAt`, `updatedAt`, `location`) VALUES (4, 'ONLINE', 'string', 0, 0, 'https://www.google.com', '2023-01-12 15:05:10', '2023-01-12 15:05:10', 0, 0, 1, 1, 1, 'string', 'ACTIVE', '2023-01-12 16:53:00', '2023-01-12 16:53:00', NULL);
INSERT INTO `seminars` (`seminarId`, `seminarType`, `toppics`, `latitude`, `longitude`, `seminarUrl`, `dateFrom`, `dateTo`, `haveFee`, `fee`, `breakfast`, `lunch`, `dinner`, `remark`, `status`, `createdAt`, `updatedAt`, `location`) VALUES (5, 'OFFLINE', 'หารือ การซ้อมดับไฟ', 0, 0, NULL, '2023-01-12 17:31:12', '2023-01-12 17:31:12', 0, 0, 1, 1, 1, 'ท่านใดต้องการนำรถส่วนตัวมาจอด กรุณาติดต่อ ...', 'ACTIVE', '2023-01-12 17:33:07', '2023-01-12 17:33:07', NULL);
COMMIT;

-- ----------------------------
-- Table structure for speakers
-- ----------------------------
DROP TABLE IF EXISTS `speakers`;
CREATE TABLE `speakers` (
  `speakerId` int NOT NULL AUTO_INCREMENT,
  `citizenId` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `nation` varchar(255) DEFAULT NULL,
  `gender` enum('MALE','FEMALE','HOMOSEXUAL','NOT_SPECIFIED') DEFAULT NULL,
  `address` text,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `bio` text,
  `status` enum('ACTIVE','INACTIVE','DELETED') DEFAULT 'ACTIVE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`speakerId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of speakers
-- ----------------------------
BEGIN;
INSERT INTO `speakers` (`speakerId`, `citizenId`, `firstName`, `middleName`, `lastName`, `nickname`, `nation`, `gender`, `address`, `email`, `phone`, `bio`, `status`, `createdAt`, `updatedAt`) VALUES (1, '11111111111', 'Thanachot', NULL, 'Tesjaroen', 'Arm', 'Thai', 'MALE', 'Bangkok', 'arm1997a@gmail.com', NULL, 'Backend developer', 'ACTIVE', '2023-01-12 18:02:37', '2023-01-12 18:02:37');
COMMIT;

-- ----------------------------
-- Table structure for visitors
-- ----------------------------
DROP TABLE IF EXISTS `visitors`;
CREATE TABLE `visitors` (
  `visitorId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `nation` varchar(255) DEFAULT NULL,
  `gender` enum('MALE','FEMALE','HOMOSEXUAL','NOT_SPECIFIED') DEFAULT NULL,
  `address` text,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `acceptedInvitation` tinyint(1) DEFAULT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE','DELETED') DEFAULT 'ACTIVE',
  `seminarId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`visitorId`),
  KEY `seminarId` (`seminarId`),
  CONSTRAINT `visitors_ibfk_1` FOREIGN KEY (`seminarId`) REFERENCES `seminars` (`seminarId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of visitors
-- ----------------------------
BEGIN;
INSERT INTO `visitors` (`visitorId`, `firstName`, `middleName`, `lastName`, `nickname`, `nation`, `gender`, `address`, `email`, `phone`, `acceptedInvitation`, `paid`, `status`, `seminarId`, `createdAt`, `updatedAt`) VALUES (1, 'Thanachot', NULL, 'Tesjaroen', 'Arm', 'Thai', 'MALE', 'Bangkok', 'arm1997a@gmail.com', '0894493088', 1, 0, 'ACTIVE', 2, '2023-01-13 03:26:50', '2023-01-13 03:26:50');
INSERT INTO `visitors` (`visitorId`, `firstName`, `middleName`, `lastName`, `nickname`, `nation`, `gender`, `address`, `email`, `phone`, `acceptedInvitation`, `paid`, `status`, `seminarId`, `createdAt`, `updatedAt`) VALUES (9, 'John', 'Doe', 'Smith', 'Johnny', 'USA', 'MALE', '123 Main St', 'john.doe@example.com', '555-555-5555', 1, 1, 'ACTIVE', 5, '2023-01-13 06:52:39', '2023-01-13 06:53:30');
INSERT INTO `visitors` (`visitorId`, `firstName`, `middleName`, `lastName`, `nickname`, `nation`, `gender`, `address`, `email`, `phone`, `acceptedInvitation`, `paid`, `status`, `seminarId`, `createdAt`, `updatedAt`) VALUES (10, 'Jane', 'Doe', 'Johnson', 'Janey', 'USA', 'FEMALE', '456 Park Ave', 'jane.doe@example.com', '555-555-5556', 1, 1, 'ACTIVE', 5, '2023-01-13 06:52:39', '2023-01-13 06:53:31');
INSERT INTO `visitors` (`visitorId`, `firstName`, `middleName`, `lastName`, `nickname`, `nation`, `gender`, `address`, `email`, `phone`, `acceptedInvitation`, `paid`, `status`, `seminarId`, `createdAt`, `updatedAt`) VALUES (11, 'Bob', 'Johnson', 'Williams', 'Bobby', 'USA', 'MALE', '789 Elm St', 'bob.johnson@example.com', '555-555-5557', 1, 1, 'ACTIVE', 5, '2023-01-13 06:52:39', '2023-01-13 06:53:32');
INSERT INTO `visitors` (`visitorId`, `firstName`, `middleName`, `lastName`, `nickname`, `nation`, `gender`, `address`, `email`, `phone`, `acceptedInvitation`, `paid`, `status`, `seminarId`, `createdAt`, `updatedAt`) VALUES (12, 'Charlie', 'Smith', 'Jones', 'Charlie', 'USA', 'MALE', '111 Oak St', 'charlie.smith@example.com', '555-555-5558', 1, 1, 'ACTIVE', 5, '2023-01-13 06:52:39', '2023-01-13 06:53:34');
INSERT INTO `visitors` (`visitorId`, `firstName`, `middleName`, `lastName`, `nickname`, `nation`, `gender`, `address`, `email`, `phone`, `acceptedInvitation`, `paid`, `status`, `seminarId`, `createdAt`, `updatedAt`) VALUES (13, 'Emily', 'Williams', 'Brown', 'Em', 'USA', 'FEMALE', '222 Pine St', 'emily.williams@example.com', '555-555-5559', 1, 1, 'ACTIVE', 5, '2023-01-13 06:52:39', '2023-01-13 06:53:35');
INSERT INTO `visitors` (`visitorId`, `firstName`, `middleName`, `lastName`, `nickname`, `nation`, `gender`, `address`, `email`, `phone`, `acceptedInvitation`, `paid`, `status`, `seminarId`, `createdAt`, `updatedAt`) VALUES (14, 'Michael', 'Jones', 'Miller', 'Mike', 'USA', 'MALE', '333 Cedar St', 'michael.jones@example.com', '555-555-5560', 1, 1, 'ACTIVE', 5, '2023-01-13 06:52:39', '2023-01-13 06:53:37');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
