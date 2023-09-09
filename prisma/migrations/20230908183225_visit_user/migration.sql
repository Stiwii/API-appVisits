-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('RECEPCION', 'SUPERVISOR');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('ADMINISTRACION', 'PROVEEDORES', 'SERVICIO_AL_CLIENTE', 'VENTAS');

-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('EN_CURSO', 'FINALIZADO');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'RECEPCION',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "entryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visitReason" TEXT NOT NULL,
    "department" "Department" NOT NULL DEFAULT 'SERVICIO_AL_CLIENTE',
    "status" "VisitStatus" NOT NULL DEFAULT 'EN_CURSO',
    "note" TEXT,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_username_password_idx" ON "User"("username", "password");

-- CreateIndex
CREATE UNIQUE INDEX "Visit_idNumber_key" ON "Visit"("idNumber");

-- CreateIndex
CREATE INDEX "Visit_date_time_idx" ON "Visit"("date", "time");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
