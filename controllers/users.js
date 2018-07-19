'user strict';
module.exports = function(_,passport,UserHelper) {
    return {
        setRouting : function(router) {
            router.get('/',this.indexPage);
            router.get('/signup',this.getSignUp);
            router.get('/home',this.homePage);

            router.post('/', UserHelper.loginValidation ,this.postLogin);
            router.post('/signup',UserHelper.signUpValidation ,this.postSignUp);
        },
        indexPage : function(req,res) {
            const errors = req.flash('error');
            return res.render('index', { title : 'Chat App | Login', messages : errors , hasError : (errors.length > 0) });
        },
        getSignUp : function(req,res) {
            const errors = req.flash('error');
            return res.render('signup', { title : 'Chat App | SignUp', messages : errors , hasError : (errors.length > 0) });
        },
        postSignUp : passport.authenticate('local.signup', {
            successRedirect : '/home',
            failureRedirect : '/signup',
            failureFlash : true
        }),
        postLogin : passport.authenticate('local.login', {
            successRedirect : '/home',
            failureRedirect : '/',
            failureFlash : true
        }),
        homePage : function(req,res) {
            return res.render('home');
        }
    }
}