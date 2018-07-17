'user strict';
module.exports = function(_,passport) {
    return {
        setRouting : function(router) {
            router.get('/',this.indexPage);
            router.get('/signup',this.getSignUp);
            router.post('/signup',this.postSignUp);
        },
        indexPage : function(req,res) {
            return res.render('index',{test : 'this is a test'});
        },
        getSignUp : function(req,res) {
            return res.render('signup');
        },
        postSignUp : passport.authenticate('local.signup', {
            successRedirect : '/home',
            failureRedirect : '/signup',
            failureFlash : true
        })
    }
}