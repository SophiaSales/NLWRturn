import { SubmitFeedbackService } from "./submit-feedback-service";

//spies = espiões : saber se todas as funçoes foram testadas  

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpy }, //verificando se a funçao de criar um feedback esta funcionando
    { sendMail: sendMailSpy } //verificando se a funçao de enviar um email esta funcionando 
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async() =>{ //testando se esta fazendo um fedback
         await expect(submitFeedback.execute({ // é esperado que quando chamo o metodo passando os parametros ele resolva sem dar erro 
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64dkpgojsoighrofghvo'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled(); //espero que a funçao feedback tenha sido chamada 
        expect(sendMailSpy).toHaveBeenCalled(); //espero que a funçao de email tenha sido chamada
    });
    it('should not be able to submit feedback without type', async() =>{ //testando se esta fazendo um fedback sem um tipo 
        await expect(submitFeedback.execute({ // é esperado que quando chamo o metodo passando os parametros ele rejeita  e de erro 
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64dkpgojsoighrofghvo'
        })).rejects.toThrow();
    });
    it('should not be able to submit feedback without commet', async() =>{ //testando se esta fazendo um fedback sem um comentario 
        await expect(submitFeedback.execute({ // é esperado que quando chamo o metodo passando os parametros ele rejeita e de erro 
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64dkpgojsoighrofghvo'
        })).rejects.toThrow();
    });
    it('should not be able to submit feedback with an invalid screenshot', async() =>{ //testando se esta fazendo um fedback com uma Screenshot invalida
        await expect(submitFeedback.execute({ // é esperado que quando chamo o metodo passando os parametros ele rejeita e de erro 
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'Teste.jpg'
        })).rejects.toThrow();
    });
});