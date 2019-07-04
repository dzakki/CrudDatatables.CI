-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2019 at 08:10 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cruddatatables_ci`
--

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `slug` varchar(128) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `slug`, `text`) VALUES
(1, 'While not shown above', 'While-not-shown-above', ' feel free to use <b> and <i> in HTML5. <b> is meant to highlight words or phrases without conveying additional importance while <i> is mostly for voice, technical terms, etc.'),
(2, 'Why do we use it?', 'Why-do-we-use-it?', 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,'),
(3, 'Where does it come from?', 'Where-does-it-come-from?', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.'),
(4, 'Where can I get some?', 'Where-can-I-get-some?', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, '),
(5, 'Neque porro quisquam est', 'Neque-porro-quisquam-est', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum ornare cursus. Proin porttitor sollicitudin bibendum. Maecenas non mi a arcu tempus finibus. '),
(6, 'Nulla id volutpat urna', 'Nulla-id-volutpat-urna', 'Pellentesque vitae malesuada nunc. Curabitur tristique malesuada leo, quis semper elit pharetra et. Donec sed leo sit amet nunc gravida rutrum at ac orci. '),
(7, 'Phasellus fringilla nibh eget', 'Phasellus-fringilla-nibh-eget', 'elit posuere, id ultricies ipsum dignissim. Sed bibendum consectetur lobortis. Aliquam vitae rhoncus lectus. Mauris porta purus nisi, non commodo elit gravida in. Donec interdum efficitur libero, '),
(8, 'vitae tristique nunc lacinia vitae', 'vitae-tristique-nunc-lacinia-vitae', 'Nunc sagittis lectus velit, sed scelerisque sapien facilisis quis. Praesent fermentum diam sit amet metus tincidunt, ornare mattis magna iaculis. '),
(9, 'Fusce pretium massa', 'Fusce-pretium-massa', 'in mauris tempor, a posuere ante dapibus. Pellentesque risus elit, dignissim vitae massa at, malesuada rhoncus massa. Mauris blandit nibh dui'),
(10, 'et dignissim risus commodo vel', 'et-dignissim-risus-commodo-vel', 'Curabitur ullamcorper facilisis leo, ac aliquam elit sodales eu. Cras et dui hendrerit, accumsan metus vel, lobortis dolor. Mauris commodo posuere nisl non hendrerit.'),
(11, 'Duis vel vulputate ipsum', 'Duis-vel-vulputate-ipsum', 'Vivamus ut egestas ligula, sit amet tempus mauris.  Vivamus ut egestas ligula, sit amet tempus mauris.  Vivamus ut egestas ligula, sit amet tempus mauris. '),
(12, 'Aenean malesuada sapien', 'Aenean-malesuada-sapien', 'Mauris commodo posuere nisl non hendrerit. Duis vel vulputate ipsum. Vivamus ut egestas ligula, sit amet tempus mauris. Aenean malesuada sapien in magna scelerisque, at sodales urna sollicitudin. Cras commodo tempus erat, venenatis lobortis ipsum vehicula rhoncus. Proin suscipit finibus cursus.'),
(13, 'Maecenas ornare consectetur', 'Maecenas-ornare-consectetur', 'Maecenas ornare consectetur semper. Proin egestas malesuada turpis, eget blandit felis tincidunt ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu dolor risus.'),
(14, 'Pellentesque lorem odio', 'Pellentesque-lorem-odio', 'aliquam in lacinia at, tempor non erat. In hac habitasse platea dictumst. Praesent semper sollicitudin massa convallis fringilla. In pharetra risus dui, id lacinia'),
(15, 'How to life', 'how-to-life', 'if you want to life, you must have a dream for future..'),
(17, 'How to get a girlfriend', 'how-to-get-a-girlfriend', 'you have to look for bad girl, so you can get fast'),
(18, '5 news this month bro', '5-news-this-month-bro', '1. I get girlfriend!\r\n2. I get money\r\n3. I get ticket\r\n4. I get dream\r\n5. I get rank');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `slug` (`slug`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
