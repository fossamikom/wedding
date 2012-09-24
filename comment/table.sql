--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `text` varchar(128) collate utf8_unicode_ci NOT NULL default '',
  `name` varchar(60) collate utf8_unicode_ci NOT NULL default '',
  `color` enum('yellow','blue','green') collate utf8_unicode_ci NOT NULL default 'yellow',
  `xyz` varchar(20) collate utf8_unicode_ci NOT NULL default '',
  `dt` timestamp NOT NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=27 ;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` VALUES(1, 'This is the first note! Add yours from the button above..', 'Martin', 'yellow', '478x0x1', '2010-01-17 06:30:14');
INSERT INTO `notes` VALUES(2, 'The position of the notes is saved with AJAX.', 'Martin', 'blue', '0x321x2', '2010-01-17 06:57:39');
INSERT INTO `notes` VALUES(3, 'The notes are automatically deleted after an hour.', 'Martin', 'green', '311x41x3', '2010-01-17 06:57:39');