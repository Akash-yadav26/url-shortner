const express= require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const {connectToMongoDB} = require('./connect');
const URL = require('./models/url');
const { checkForAuthentication,restrictTo}= require("./middlewares/auth");
const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter');
const userRoute = require("./routes/user")

const app = express();
const port = 8001;
connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log('mongodb connected'));
// ejs for server side rendering
app.set("view engine","ejs"); // view engine is ejs
app.set('views',path.resolve("./views"));// views  file  location


app.get('/test',async(req,res)=>{
    const allUrls = await URL.find({});
    return res.render("home",{
    urls: allUrls,    
    });
})
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use( checkForAuthentication);


app.use("/url",restrictTo(["Normal","ADMIN"]),urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);

app.get('/url/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
     const entry = await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push:{
        visitHistory: {
            timestamp: Date.now(),
        },
    },
});
res.redirect(entry.redirectURL);
});
app.listen(port,()=> console.log(`server started at port ${port}`))
