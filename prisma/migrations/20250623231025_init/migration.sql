-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('Concluída', 'Pendente');

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'Pendente',

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
