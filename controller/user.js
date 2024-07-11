const session = require("express-session");
const authData=require("../model/userData");
const bcrypt = require('bcrypt');
const path = require('path');
const nodemailer = require('nodemailer');

exports.homePage=(req,res,next)=>{  

    res.render("user/homePage");
}

exports.projects=(req,res,next)=>{  

    res.render("user/projects");
}

exports.project1=(req,res,next)=>{  

    res.render("user/project1");
}

exports.project2=(req,res,next)=>{  

    res.render("user/project2");
}

exports.project3=(req,res,next)=>{  

    res.render("user/project3");
}

exports.project4=(req,res,next)=>{  

    res.render("user/project4");
}

exports.project5=(req,res,next)=>{  

    res.render("user/project5");
}

exports.project6=(req,res,next)=>{  

    res.render("user/project6");
}

exports.experiences=(req,res,next)=>{  

    res.render("user/experiences");
}
exports.certificates=(req,res,next)=>{  

    res.render("user/certificates");
}


exports.musics=(req,res,next)=>{  

    res.render("user/musics");

}
exports.books=(req,res,next)=>{  

    res.render("user/books");
}
exports.book1=(req,res,next)=>{  

    res.render("user/book1");
}
exports.book2=(req,res,next)=>{  

    res.render("user/book2");
}
exports.book3=(req,res,next)=>{  

    res.render("user/book3");
}
exports.book4=(req,res,next)=>{  

    res.render("user/book4");
}
exports.book5=(req,res,next)=>{  

    res.render("user/book5");
}
exports.movies=(req,res,next)=>{  

    res.render("user/movies");
}

exports.cv=(req,res,next)=>{  

    const file = 'D:/yazilim/web/Blog/public/downloads/arif_cv.pdf';
    res.download(file);
}

exports.about=(req,res,next)=>{  

    res.render("user/about");
}
exports.hobbies=(req,res,next)=>{  

    res.render("user/myHobbies");
}
exports.contactGet=(req,res,next)=>{  

    res.render("user/contact");
}

exports.contactPost = async (req, res, next) => {
    const { name, email, phone, subject, message } = req.body;

    // Nodemailer transporter configuration
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arif.kalayci44@gmail.com', // kendi email adresinizi buraya yazın
            pass: '' // uygulama şifrenizi buraya yazın
        }
    });

    // Mail options
    let mailOptions = {
        from: email,
        to: 'arif.kalayci44@gmail.com', // kendi email adresinizi buraya yazın
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.render("user/contact", { success: true }); // E-posta başarıyla gönderildiğinde
    } catch (error) {
        console.error('Error sending email:', error);
        res.render("user/contact", { success: false }); // E-posta gönderiminde hata olduğunda
    }
}