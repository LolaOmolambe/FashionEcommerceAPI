const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.firstName;
        this.url = url;
        this.from = "Beaulyne"
    }

    newTransport() {
        //Transporter
        return nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async send(template, message) {
        console.log("inside");
        //Send the email
        message = message || "";

        //Render HTML based on template
        const html = pug.renderFile(
            `${__dirname}/../emailTemplates/${template}.pug`, {
                firstName: this.firstName,
                url: this.url,
                message,
                //email
            }
        );
        //console.log("html", html);
        //Options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: "Verify Account",
            html,
            text: htmlToText.fromString(html)
        };

        //Send Mail
        try{
            console.log("here");
            await this.newTransport().sendMail(mailOptions);
        } catch(err){
            console.log(err);
            //next(err);
        }
               
    }

    async sendActivationMail() {
        console.log("mail");
        await this.send("verifyUser", "Activate your mail");
    }

}


