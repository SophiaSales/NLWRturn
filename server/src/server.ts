import { prisma } from "./prisma";
import nodemailer from 'nodemailer'
import express from "express";

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ce0c2c98ca929a",
        pass: "4826fff3f59da5"
    }
});

app.post('/feedbacks', async (req, res) =>{
    const{type, comment, screenshot} = req.body;//retornado valores da tabela do bd

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot
        }
    })
    await transport.sendMail({ //enviando email pra pessoa que for fazer um feedback 
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Sophia <sophiabrenda10@gmail.com>',
        subject: 'Novo feedback',
        html:[
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo de feedback: ${type}</p>`,
            `<p>Comentario: ${comment}</p>`,
            `</div>`
        ].join('\n')
    })
    
    return res.status(201).json({data: feedback});//retornando estatus 201 e valores em json quando valores sao envidos para o bd 
})

app.listen(3333, () =>{
    console.log("Server running!");
});