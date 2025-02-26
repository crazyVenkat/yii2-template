-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2025 at 03:15 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `miyatech`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `is_deleted` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login_admin`
--

CREATE TABLE `login_admin` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `role` varchar(50) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0-Inactive,1-active',
  `is_delete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1-deleted'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `login_admin`
--

INSERT INTO `login_admin` (`id`, `username`, `password`, `role`, `userid`, `status`, `is_delete`) VALUES
(1, 'superadmin', '17c4520f6cfd1ab53d8745e84681eb49', 'Superadmin', 1, 1, 0),
(2, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'Admin', 1, 1, 0),
(3, 'renuka', '81dc9bdb52d04dc20036dbd8313ed055', 'User', 1, 1, 0),
(4, 'Test_del', '81dc9bdb52d04dc20036dbd8313ed055', 'User', 2, 0, 1),
(5, 'Example_del', '81dc9bdb52d04dc20036dbd8313ed055', 'User', 3, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `theme`
--

CREATE TABLE `theme` (
  `id` int(11) NOT NULL,
  `clientid` int(11) DEFAULT NULL,
  `logo_bg` varchar(20) DEFAULT NULL,
  `menu_bg` varchar(20) DEFAULT NULL,
  `page_bg` varchar(20) DEFAULT NULL,
  `menu_text` varchar(50) DEFAULT NULL,
  `menu_hover` varchar(50) DEFAULT NULL,
  `login_text` varchar(55) DEFAULT NULL,
  `login_text_hover` varchar(20) DEFAULT NULL,
  `login_border` varchar(20) DEFAULT NULL,
  `login_normal` varchar(20) DEFAULT NULL,
  `login_hover` varchar(20) DEFAULT NULL,
  `head_text` varchar(50) DEFAULT NULL,
  `head_bg` varchar(50) DEFAULT NULL,
  `login_page_bg` varchar(20) DEFAULT NULL,
  `footer_text` varchar(255) DEFAULT NULL,
  `form_header_bg` varchar(150) DEFAULT NULL,
  `model_bg` varchar(150) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `logo_sm` varchar(255) DEFAULT NULL,
  `favicon` varchar(255) DEFAULT NULL,
  `createdDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_delete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1-deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `theme`
--

INSERT INTO `theme` (`id`, `clientid`, `logo_bg`, `menu_bg`, `page_bg`, `menu_text`, `menu_hover`, `login_text`, `login_text_hover`, `login_border`, `login_normal`, `login_hover`, `head_text`, `head_bg`, `login_page_bg`, `footer_text`, `form_header_bg`, `model_bg`, `logo`, `logo_sm`, `favicon`, `createdDate`, `is_delete`) VALUES
(1, 1, '#5b0466', '#741a80', '#f2e5f3', '#f2e5f3', '#f2e5f3', 'white', 'white', '#5b0466', '#741a80', '#5b0466', 'white', '#741a80', '#f2e5f3', 'Giramiyan ', '#f8f9fa', '#f8f9fa', '1733223993logo.png', '1733223993logo-sm.png', '1733223993favicon.png', '2024-12-03 06:42:43', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `loginid` int(11) DEFAULT NULL,
  `createddate` timestamp NOT NULL DEFAULT current_timestamp(),
  `isdelete` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `loginid`, `createddate`, `isdelete`) VALUES
(1, 'admin', '1234', 3, '2024-12-02 11:04:08', 0),
(2, 'Test_del', '1234', 4, '2025-02-26 06:47:37', 1),
(3, 'Example_del', '1234', 5, '2025-02-25 22:00:45', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_admin`
--
ALTER TABLE `login_admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `theme`
--
ALTER TABLE `theme`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login_admin`
--
ALTER TABLE `login_admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `theme`
--
ALTER TABLE `theme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
