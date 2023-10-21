-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `profile` VARCHAR(2) NOT NULL,
    `status` VARCHAR(2) NOT NULL,
    `password` VARCHAR(300) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `sku` VARCHAR(100) NOT NULL,
    `category` VARCHAR(150) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DECIMAL(15, 4) NOT NULL,
    `description` TEXT NULL,
    `image_path` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `payment_method` VARCHAR(255) NOT NULL,
    `total` DECIMAL(15, 4) NOT NULL,
    `date_added` DATETIME NOT NULL,
    `date_modified` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DECIMAL(15, 4) NOT NULL,
    `total` DECIMAL(15, 4) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
