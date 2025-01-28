const ejs = require('ejs');
const nodemailer = require('nodemailer');
const path = require('path');


const loadHome = async (req, res)=>{
    try {
        res.render('index');
        // console.log('home page loaded successfully');

    } catch (error) {
        console.log('error in loading home page :', error.message);
        res.render('500', {errorMessage: error.message});
    }
}



const loadContact = async (req, res)=>{
    try {
        res.render('contact');
        // console.log('contact page loaded successfully');

    } catch (error) {
        console.log('error in loading contact page :', error.message);
        res.render('500', {errorMessage: error.message});
    }
}




const loadProjects = async (req, res)=>{
    try {
        res.render('projects');
        // console.log('projects page loaded successfully');

    } catch (error) {
        console.log('error in loading projects page :', error.message);
        res.render('500', {errorMessage: error.message});
    }
}



const loadAbout = async (req, res)=>{
    try {
        res.render('about');
        // console.log('about page loaded successfully');

    } catch (error) {
        console.log('error in loading about page :', error.message);
        res.render('500', {errorMessage: error.message});
    }
}




const loadJournal = async (req, res)=>{
    try {
        // res.render('journal');
        res.render('journal2');
        // console.log('journal page loaded successfully');

    } catch (error) {
        console.log('error in loading journal page :', error.message);
        res.render('500', {errorMessage: error.message});
    }
}




const load404 = async (req, res)=>{
    try {
        res.render('404');
        // console.log('404 page loaded successfully');

    } catch (error) {
        console.log('error in loading 404 page :', error.message);
        res.render('500', {errorMessage: error.message});
    }
}



const sendMessage = async (req, res)=>{
    try {
        console.log('body :', req.body);
        
        const {firstName, lastName, email, phone, message} = req.body;
        const emailSubject = `New message from ${firstName} ${lastName}.`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.emailUser,
                pass: process.env.emailPassword
            }
        });

        const emailTemplatePath = path.join(__dirname, '../views/custom-templates/email-message-template.ejs');

        ejs.renderFile(
            emailTemplatePath,
            { firstName, lastName, email, phone, message, emailSubject }, // Pass data here
            (err, renderedHTML) => {
                if (err) {
                    console.error('Error rendering EJS template:', err);
                    return res.status(500).send('Error rendering email template');
                }
        
                // Define the mail options
                const mailOptions = {
                    from: email, // Sender's email
                    to: process.env.emailUser, // Your email
                    subject: emailSubject, // Email subject
                    html: renderedHTML, // Use rendered HTML from EJS
                };
        
                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error in transporter sending mail:', error);
                        return res.status(500).send('Error sending email');
                    } else {
                        console.log('Email sent to user:', info.response);
                        return res.status(200).json({ success: true });
                    }
                });
            }
        );
        


    } catch (error) {
        console.log('error in sending message :', error.message);
        // res.render('500');
        return res.status(500).render('500');
    }
}




const loadEmailMessage = async (req, res)=>{
    try {
        res.render('email-message-preview');
        // console.log('email page loaded successfully');

    } catch (error) {
        console.log('error in loading email page :', error.message);
        res.render('500', {errorMessage: error.message});
    }
}


module.exports = {
    loadHome,
    loadContact,
    loadProjects,
    loadAbout,
    loadJournal,
    load404,
    sendMessage,
    loadEmailMessage,
}