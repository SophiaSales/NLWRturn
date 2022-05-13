import express from "express";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackService } from "./services/submit-feedback-service";
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) =>{
    const{type, comment, screenshot} = req.body;//retornado valores da tabela do bd

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    );
    
    await submitFeedbackService.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send();//retornando estatus 201 quando valores sao envidos para o bd 
})