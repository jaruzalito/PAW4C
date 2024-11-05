-- CreateTable
CREATE TABLE `Wpis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tekstWpisu` VARCHAR(191) NOT NULL,
    `tytul` VARCHAR(191) NOT NULL,
    `stworzono` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idKategoria` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nazwa` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kategoria_nazwa_key`(`nazwa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Komentarz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `zawartosc` VARCHAR(191) NOT NULL,
    `stworzono` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idWpis` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_idKategoria_fkey` FOREIGN KEY (`idKategoria`) REFERENCES `Kategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Komentarz` ADD CONSTRAINT `Komentarz_idWpis_fkey` FOREIGN KEY (`idWpis`) REFERENCES `Wpis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
