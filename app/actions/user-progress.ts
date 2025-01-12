'use server'

import { PrismaClient, Journey } from '@prisma/client'

const prisma = new PrismaClient()

export async function getUserProgress(userId: string): Promise<Journey | null> {
  return await prisma.journey.findUnique({
    where: { userId },
  })
}

export async function updateUserProgress(userId: string, data: Partial<Journey>): Promise<Journey> {
  return await prisma.journey.upsert({
    where: { userId },
    update: data,
    create: {
      userId,
      ...data,
      currentLevel: data.currentLevel ?? 1,
      points: data.points ?? 0,
    },
  })
}

export async function saveLanguageChoice(userId: string, language: string): Promise<Journey> {
  return await updateUserProgress(userId, { language })
}

