import { Router } from 'express'
import { tweetsController } from "./tweets.controller"

export const router = Router()

router.get('/tweets', tweetsController.getAll)