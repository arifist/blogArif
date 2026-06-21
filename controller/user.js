const path = require('path');
const nodemailer = require('nodemailer');

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

exports.homePage=(req,res,next)=>{  

    res.render("user/homePage.ejs");
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

exports.project7=(req,res,next)=>{  

    res.render("user/project7");
}

exports.project8=(req,res,next)=>{  

    res.render("user/project8");
}

exports.project9=(req,res,next)=>{  

    res.render("user/project9");
}

exports.project10=(req,res,next)=>{  

    res.render("user/project10");
}

exports.project11=(req,res,next)=>{  

    res.render("user/project11");
}

exports.project12=(req,res,next)=>{  

    res.render("user/project12");
}

exports.project13=(req,res,next)=>{  

    res.render("user/project13");
}
exports.project14=(req,res,next)=>{  

  res.render("user/project14");
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

exports.cv = (req, res, next) => {
  const file = path.join(__dirname, '../public/downloads/Arif_Kalayci_CV.pdf');
  res.download(file);
};

exports.about=(req,res,next)=>{

    res.render("user/about");
}

exports.contactGet=(req,res,next)=>{

    res.render("user/contact");
}

exports.contactPost = async (req, res, next) => {

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        succeeded: false,
        error: 'Lütfen isim, e-posta ve mesaj alanlarını doldurun.',
      });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const htmlTemplate = `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Transactional Email</title>
        <style>
          /* -------------------------------------
              GLOBAL RESETS
          ------------------------------------- */
          
          /*All the styling goes here*/
          
          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; 
          }
    
          body {
            background-color: #f6f6f6;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
          }
    
          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%; }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top; 
          }
    
          /* -------------------------------------
              BODY & CONTAINER
          ------------------------------------- */
    
          .body {
            background-color: #f6f6f6;
            width: 100%; 
          }
    
          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
          .container {
            display: block;
            margin: 0 auto !important;
            /* makes it centered */
            max-width: 580px;
            padding: 10px;
            width: 580px; 
          }
    
          /* This should also be a block element, so that it will fill 100% of the .container */
          .content {
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 580px;
            padding: 10px; 
          }
    
          /* -------------------------------------
              HEADER, FOOTER, MAIN
          ------------------------------------- */
          .main {
            background: #ffffff;
            border-radius: 3px;
            width: 100%; 
          }
    
          .wrapper {
            box-sizing: border-box;
            padding: 20px; 
          }
    
          .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
          }
    
    
        </style>
      </head>
      <body>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
            <td>&nbsp;</td>
            <td class="container">
              <div class="content">
    
                <!-- START CENTERED WHITE CONTAINER -->
                <table role="presentation" class="main">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <p>Email: ${safeEmail}</p>
                            <p>Name: ${safeName}</p>
                            <p>Message: ${safeMessage}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                <!-- END MAIN CONTENT AREA -->
                </table>
                <!-- END CENTERED WHITE CONTAINER -->
    
    
              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>
    `;


    try {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: process.env.NODE_MAIL, // generated ethereal user
            pass: process.env.NODE_PASS, // generated ethereal password
          },
        });
    
        // send mail with defined transport object
        await transporter.sendMail({
          to: 'arif.kalayci444@gmail.com', // list of receivers
          replyTo: email,
          subject: `MAIL FROM ${safeEmail}`, // Subject line
          html: htmlTemplate, // html body
        });
    
        res.status(200).json({ succeeded: true });
      } catch (error) {
        console.error('contactPost mail error:', error);
        res.status(500).json({
          succeeded: false,
          error: 'Mesajınız gönderilirken bir hata oluştu, lütfen daha sonra tekrar deneyin.',
        });
      }
};


const downloadCertificate = (fileName) => (req, res, next) => {
  const file = path.join(__dirname, '../public/downloads', fileName);
  res.download(file);
};

exports.sertifika1 = downloadCertificate('javat.pdf');
exports.sertifika2 = downloadCertificate('atolye.pdf');
exports.sertifika3 = downloadCertificate('javab.pdf');
exports.sertifika4 = downloadCertificate('web.pdf');
exports.sertifika5 = downloadCertificate('tsql.pdf');
exports.sertifika6 = downloadCertificate('sql.pdf');
exports.sertifika7 = downloadCertificate('flutter.pdf');
exports.sertifika8 = downloadCertificate('python.pdf');
exports.sertifika9 = downloadCertificate('cisco.pdf');
exports.sertifika10 = downloadCertificate('mvc.pdf');