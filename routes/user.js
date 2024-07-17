const express=require("express");
const router=express.Router();
const userController=require("../controller/user");


router.get("/",userController.homePage);

router.get("/projects",userController.projects);

router.get("/project1",userController.project1);

router.get("/project2",userController.project2);

router.get("/project3",userController.project3);

router.get("/project4",userController.project4);

router.get("/project5",userController.project5);

router.get("/project6",userController.project6);

router.get("/project7",userController.project7);

router.get("/project8",userController.project8);

router.get("/project9",userController.project9);

router.get("/project10",userController.project10);

router.get("/project11",userController.project11);

router.get("/project12",userController.project12);

router.get("/project13",userController.project13);

router.get("/experiences",userController.experiences);

router.get("/certificates",userController.certificates);

router.get("/cv",userController.cv);

router.get("/about",userController.about);

router.get("/books",userController.books);

router.get("/book1",userController.book1);

router.get("/book2",userController.book2);

router.get("/book3",userController.book3);

router.get("/book4",userController.book4);

router.get("/book5",userController.book5);

router.get("/movies",userController.movies);

router.get("/musics",userController.musics);

router.get("/contact", userController.contactGet);

router.post("/contact", userController.contactPost);

router.get("/sertifika1",userController.sertifika1);

router.get("/sertifika2",userController.sertifika2);

router.get("/sertifika3",userController.sertifika3);

router.get("/sertifika4",userController.sertifika4);

router.get("/sertifika5",userController.sertifika5);

router.get("/sertifika6",userController.sertifika6);

router.get("/sertifika7",userController.sertifika7);

router.get("/sertifika8",userController.sertifika8);

router.get("/sertifika9",userController.sertifika9);



module.exports=router;