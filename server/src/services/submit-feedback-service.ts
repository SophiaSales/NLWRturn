import { MailAdapter } from "../adapters/mail.adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServiceRequest{
    type: string;
    comment: string;
    screenshot?: string;
}
export class SubmitFeedbackService{
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ){}

    async execute(request: SubmitFeedbackServiceRequest){
        const {type, comment, screenshot} = request;//retornado valores da tabela do bd

        if (!type){
            throw new Error('Tipe is required')
        }

        if (!comment){
            throw new Error('Tipe is required')
        }

        if(screenshot && ! screenshot.startsWith('data:image/png;base64')){//se a foto nao começar com data:image/png;base64 retorna erro
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })
        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body:[
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentario: ${comment}</p>`,
                `</div>`
            ].join('\n')
        })
    }
}