-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2022 at 05:06 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sijv`
--
CREATE DATABASE IF NOT EXISTS `sijv` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `sijv`;

-- --------------------------------------------------------

--
-- Table structure for table `asignacion`
--

CREATE TABLE `asignacion` (
  `matricula` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `grupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `asignacion`
--

INSERT INTO `asignacion` (`matricula`, `grupo`) VALUES
('2215230101', 1),
('2215230202', 1);

-- --------------------------------------------------------

--
-- Table structure for table `contacto`
--

CREATE TABLE `contacto` (
  `idContacto` int(11) NOT NULL,
  `calleNumero` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `colonia` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo` varchar(35) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `directivos`
--

CREATE TABLE `directivos` (
  `matricula` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `puesto` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grupo`
--

CREATE TABLE `grupo` (
  `idGrupo` int(11) NOT NULL,
  `nombre` varchar(5) COLLATE utf8mb4_spanish_ci NOT NULL,
  `ciclo` varchar(7) COLLATE utf8mb4_spanish_ci NOT NULL,
  `maestro` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `grupo`
--

INSERT INTO `grupo` (`idGrupo`, `nombre`, `ciclo`, `maestro`) VALUES
(1, '3-D', '2022-23', '2215230101');

-- --------------------------------------------------------

--
-- Table structure for table `historial`
--

CREATE TABLE `historial` (
  `idHistorial` int(11) NOT NULL,
  `alumno` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `grupo` int(11) NOT NULL,
  `trimestre` int(11) NOT NULL,
  `LC` varchar(250) COLLATE utf8mb4_spanish_ci NOT NULL,
  `PM` varchar(250) COLLATE utf8mb4_spanish_ci NOT NULL,
  `ECMNS` varchar(250) COLLATE utf8mb4_spanish_ci NOT NULL,
  `EF` varchar(250) COLLATE utf8mb4_spanish_ci NOT NULL,
  `A` varchar(250) COLLATE utf8mb4_spanish_ci NOT NULL,
  `ES` varchar(250) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `persona`
--

CREATE TABLE `persona` (
  `matricula` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `contrasena` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `contacto` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `borrado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `persona`
--

INSERT INTO `persona` (`matricula`, `nombre`, `apellidos`, `contrasena`, `contacto`, `tipo`, `borrado`) VALUES
('2215230001', 'Raul', 'Luna Romero', '12345', 1, 1, 0),
('2215230101', 'Consuelo', 'Trejo Rojo', '12345', 2, 2, 0),
('2215230202', 'Maximiliano', 'Lopez Dominguez', '12345', 3, 3, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asignacion`
--
ALTER TABLE `asignacion`
  ADD PRIMARY KEY (`matricula`);

--
-- Indexes for table `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`idContacto`);

--
-- Indexes for table `directivos`
--
ALTER TABLE `directivos`
  ADD PRIMARY KEY (`matricula`);

--
-- Indexes for table `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`idGrupo`);

--
-- Indexes for table `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`idHistorial`);

--
-- Indexes for table `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`matricula`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacto`
--
ALTER TABLE `contacto`
  MODIFY `idContacto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grupo`
--
ALTER TABLE `grupo`
  MODIFY `idGrupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `historial`
--
ALTER TABLE `historial`
  MODIFY `idHistorial` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
