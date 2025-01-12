'use server'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { PrismaClient, User } from '@prisma/client'
import { sendConfirmationEmail } from '../utils/email'

const prisma = new PrismaClient()

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      username: true,
      hashedPassword: true,
      emailVerified: true
    }
  })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isValid = await bcrypt.compare(password, user.hashedPassword)
  if (!isValid) {
    throw new Error('Invalid email or password')
  }

  if (!user.emailVerified) {
    throw new Error('Please verify your email before logging in')
  }

  return { id: user.id, email: user.email, username: user.username }
}

export async function register(username: string, email: string, password: string) {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username }
      ]
    }
  })

  if (existingUser) {
    throw new Error('Username or email already in use')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const verificationToken = crypto.randomBytes(32).toString('hex')

  const user = await prisma.user.create({
    data: {
      username,
      email,
      hashedPassword,
      verificationToken,
      emailVerified: false,
    },
    select: {
      id: true,
      email: true,
      username: true
    }
  })

  await sendConfirmationEmail(user.email, verificationToken)
  return { id: user.id, email: user.email, username: user.username }
}

export async function confirmEmail(token: string) {
  const user = await prisma.user.findFirst({
    where: { verificationToken: token },
    select: {
      id: true,
      username: true,
      emailVerified: true,
      verificationToken: true
    }
  })

  if (!user) {
    throw new Error('Invalid verification token')
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      verificationToken: null,
      updatedAt: new Date(),
    },
  })

  return { message: 'Email verified successfully' }
}