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



module.exports=router;