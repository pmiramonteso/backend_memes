const { createTransport } = require("nodemailer");
const pkg = require("handlebars");
const { compile } = pkg;
const { readFileSync } = require("fs");
const { join } = require("path");

const sendEmail = async (email, subject, payload, template) => {
    // Crear objeto transportador reutilizable usando el transporte SMTP por defecto
    const transporter = createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        auth: {
            usuario: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD, // Sustituir por las credenciales reales o una contraseña específica de la aplicación
        },
    });

    // Usar __dirname para obtener la ruta correcta del template
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

module.exports = sendEmail;
