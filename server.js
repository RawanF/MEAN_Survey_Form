const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.post("/result", (req, res) => {
    news = req.body.news
    if (news == "on")
        news = "Yes"
    else
        news = "No"
    var form_info = {
        name: req.body.name,
        email: req.body.email,
        location: req.body.location,
        language: req.body.language,
        gender: req.body.gender,
        comments: req.body.comments,
        news: news
    }
    console.log(form_info)
    req.session.form_info=form_info
    res.redirect('/result');

    // res.render('result', { form_info: form_info});
    // res.redirect('/result', { form_info: form_info });
})
app.get("/result", (req, res) => {
    res.render('result', {form_info : req.session.form_info});

})
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.listen(8000, () => console.log("listening on port 8000")); 