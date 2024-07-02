const express=require("express");
const router=express.Router();
const userController=require("../controller/user");


router.get("/",userController.homePage);

router.get("/mySkills",userController.skills);

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

router.get("/contact",userController.contactGet);

router.get("/contact",userController.contactPost);



module.exports=router;