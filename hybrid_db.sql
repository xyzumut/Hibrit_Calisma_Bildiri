-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 12 Eyl 2022, 19:30:13
-- Sunucu sürümü: 10.4.24-MariaDB
-- PHP Sürümü: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `hybrid_db`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `gunkontrol`
--

CREATE TABLE `gunkontrol` (
  `id` int(11) NOT NULL,
  `userid` smallint(6) NOT NULL,
  `kontrol` tinyint(1) NOT NULL,
  `tarih` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `gunler`
--

CREATE TABLE `gunler` (
  `id` int(11) NOT NULL,
  `pazartesi` tinyint(1) NOT NULL DEFAULT 1,
  `sali` tinyint(1) NOT NULL DEFAULT 1,
  `carsamba` tinyint(1) NOT NULL DEFAULT 1,
  `persembe` tinyint(1) NOT NULL DEFAULT 1,
  `cuma` tinyint(1) NOT NULL DEFAULT 1,
  `userid` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` smallint(6) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `userType` tinyint(1) NOT NULL DEFAULT 0,
  `profile_path` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Üyeleri Tutan Tablomuz';

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `userType`, `profile_path`) VALUES
(1, 'testadmin', 'testadmin', 1, NULL),
(2, 'testuser', 'testuser', 0, NULL);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `gunkontrol`
--
ALTER TABLE `gunkontrol`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userid_2` (`userid`),
  ADD KEY `userid` (`userid`);

--
-- Tablo için indeksler `gunler`
--
ALTER TABLE `gunler`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id_2` (`userid`),
  ADD KEY `user_id` (`userid`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `gunkontrol`
--
ALTER TABLE `gunkontrol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Tablo için AUTO_INCREMENT değeri `gunler`
--
ALTER TABLE `gunler`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `gunkontrol`
--
ALTER TABLE `gunkontrol`
  ADD CONSTRAINT `gunkontrol_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `gunler`
--
ALTER TABLE `gunler`
  ADD CONSTRAINT `gunler_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
