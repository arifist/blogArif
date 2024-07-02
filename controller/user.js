const session = require("express-session");
const authData=require("../model/userData");
const bcrypt = require('bcrypt');
const path = require('path');

exports.homePage=(req,res,next)=>{  

    res.render("user/homePage");
}

exports.skills=(req,res,next)=>{  

    res.render("user/mySkills");
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

exports.contactPost = (req, res, next) => {
    // Form verilerini al
    const { name, email, phone, subject, message } = req.body;

    // E-posta gönderim işlemi için seçenekler
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'arif.kalayci44@gmail.com',
        subject: `Contact Form Submission: ${subject}`,
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
        `
    };

    // E-posta gönder
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send('Form gönderilirken bir hata oluştu.');
        } else {
            console.log('Email gönderildi: ' + info.response);
            res.send('Form başarıyla gönderildi.');
        }
    });
}