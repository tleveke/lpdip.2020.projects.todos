-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : sam. 16 mai 2020 à 14:32
-- Version du serveur :  5.7.29
-- Version de PHP : 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Todos`
--
CREATE DATABASE IF NOT EXISTS `Todos` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `Todos`;

-- --------------------------------------------------------

--
-- Structure de la table `List_Task`
--

CREATE TABLE `List_Task` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `List_Task`
--

INSERT INTO `List_Task` (`id`, `label`, `description`) VALUES
(5, 'Sport', 'Liste des sports à faire'),
(6, 'Courses', 'Liste des courses !');

-- --------------------------------------------------------

--
-- Structure de la table `Task`
--

CREATE TABLE `Task` (
  `id` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `idList` int(11) NOT NULL,
  `isDone` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Task`
--

INSERT INTO `Task` (`id`, `label`, `idList`, `isDone`) VALUES
(14, 'Faire du foot', 5, 1),
(15, 'Faire du basket', 5, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `List_Task`
--
ALTER TABLE `List_Task`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Task`
--
ALTER TABLE `Task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idList` (`idList`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `List_Task`
--
ALTER TABLE `List_Task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `Task`
--
ALTER TABLE `Task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Task`
--
ALTER TABLE `Task`
  ADD CONSTRAINT `Task_ibfk_1` FOREIGN KEY (`idList`) REFERENCES `List_Task` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
