import { createTransport } from "nodemailer";
import pkg from "handlebars";
import { readFileSync } from "fs";
import { join } from "path";

const { compile } = pkg;

const sendEmail = async (email, subject, payload, template) => {
    // Crear objeto transportador reutilizable usando el transporte SMTP por defecto
    const transporter = createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        auth: {
            usuario: process.env.EMAIL_USERNAME,  // Corregido: 'usuario' a 'usuario'
            pass: process.env.EMAIL_PASSWORD, // Sustituir por las credenciales reales o una contraseña específica de la aplicación
        },
    });

    const root = join(__dirname, "../", template);
    const source = readFileSync(root, "utf8");
    const compiledTemplate = compile(source);

    const options = () => {
        return {
            from: process.env.FROM_EMAIL,
            to: email,
            subject: subject,
            html: compiledTemplate(payload),
        };
    };

    // Enviar el correo
    return new Promise((resolve, reject) => {
        transporter.sendMail(options(), (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve('OK');
            }
        });
    });
};

export default sendEmail;

