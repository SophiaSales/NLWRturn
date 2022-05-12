import { MailAdapter, SendMailData } from "../mail.adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ce0c2c98ca929a",
        pass: "4826fff3f59da5"
    }
});

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({ //enviando email pra pessoa que for fazer um feedback 
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Sophia <sophiabrenda10@gmail.com>',
            subject,
            html:body
        })

    }
}