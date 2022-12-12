-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2022 a las 10:28:46
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sijv`
--
CREATE DATABASE IF NOT EXISTS `sijv` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE `sijv`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacion`
--

CREATE TABLE `asignacion` (
  `matricula` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `grupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `asignacion`
--

INSERT INTO `asignacion` (`matricula`, `grupo`) VALUES
('2215230101', 1),
('2215230202', 1),
('2215230203', 2),
('2215230204', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `idContacto` int(11) NOT NULL,
  `direccion` varchar(100) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo` varchar(35) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`idContacto`, `direccion`, `correo`, `telefono`) VALUES
(1, 'La quinta #23', 'raullr@gmail.com', '7714328900'),
(2, 'Venustiano Carranza #329', 'contrejo@gmail.com', '7712966590'),
(3, 'Calle 23 #123', 'NA', '7711009722'),
(16, 'La villita #321', 'mtzrjorge@gmail.com', '7711659230');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `directivos`
--

CREATE TABLE `directivos` (
  `matricula` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `puesto` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `directivos`
--

INSERT INTO `directivos` (`matricula`, `puesto`, `activo`) VALUES
('2215230001', 'Secretario', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `idGrupo` int(11) NOT NULL,
  `nombre` varchar(5) COLLATE utf8mb4_spanish_ci NOT NULL,
  `ciclo` varchar(7) COLLATE utf8mb4_spanish_ci NOT NULL,
  `maestro` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`idGrupo`, `nombre`, `ciclo`, `maestro`) VALUES
(1, '3-D', '2022-23', '2215230101'),
(2, '2-B', '2022-23', '2215230204');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
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

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`idHistorial`, `alumno`, `grupo`, `trimestre`, `LC`, `PM`, `ECMNS`, `EF`, `A`, `ES`) VALUES
(2, '2215230202', 1, 1, 'va bien hasta ahora', '', '', '', 'va bien', ''),
(6, '2215230202', 1, 2, 'todo ok', '', '', 'mejorar condición fisica', '', ''),
(7, '2215230202', 1, 3, '', '', '', '', '', ''),
(8, '2215230202', 1, 4, '', '', '', '', '', ''),
(9, '2215230203', 2, 1, 'mejora', '', '', '', '', ''),
(10, '2215230203', 2, 2, 'asdfewqrqrfdsaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeqwwwwwwwrbfdsbbbbbbbbbbbfsdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeeeeeeeeeeeeeeeeeeeeeettttttttttttttttttttttttttttttttttttttttqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `matricula` varchar(10) COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombres` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `contrasena` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `contacto` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `borrado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`matricula`, `nombres`, `apellidos`, `contrasena`, `contacto`, `tipo`, `borrado`) VALUES
('2215230001', 'Raul', 'Luna Romero', '12345', 1, 1, 0),
('2215230101', 'Consuelo', 'Trejo Rojo', '12345', 2, 2, 0),
('2215230202', 'Maximiliano', 'Lopez Dominguez', '12345', 3, 3, 0),
('2215230203', 'Sofia', 'Jimenez Torres', '12345', 4, 3, 0),
('2215230204', 'Jorge Alberto', 'Martinez Rojo', '12345', 16, 2, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignacion`
--
ALTER TABLE `asignacion`
  ADD PRIMARY KEY (`matricula`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`idContacto`);

--
-- Indices de la tabla `directivos`
--
ALTER TABLE `directivos`
  ADD PRIMARY KEY (`matricula`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`idGrupo`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`idHistorial`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`matricula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `idContacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `idGrupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `idHistorial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
