define(["jquery","backbone","dustcore", "views/UserHomeView","models/UserHomeModel", "views/UserFriendsView", "models/UserFriendsModel","views/FriendHomeView", "models/FriendHomeModel"], function($, Backbone, dust, UserHomeView, UserHomeModel, UserFriendsView, UserFriendsModel,FriendHomeView, FriendHomeModel){

    var AppRouter = Backbone.Router.extend({

        routes: {
            ""         : "userHomeRoute",
            "friends"  : "userFriendsRoute",
            "friendWL/:id" : "friendHomeRoute"
        },

        initialize: function () {
        },
        userHomeRoute: function () {

            if (!this.userHomeView) {
                this.userHomeModel = new UserHomeModel();
                this.userHomeView = new UserHomeView({model : this.userHomeModel});
            }
            this.userHomeView.render();
            $('#content').html(this.userHomeView.el);
            $('.nav > li').removeClass('active');
            $('.nav > li.home-view').addClass('active');

        },
        userFriendsRoute: function () {
            if (!this.userFriendsView) {
                this.userFriendsModel = new UserFriendsModel();
                this.userFriendsView = new UserFriendsView({model : this.userFriendsModel});
            }
            this.userFriendsView.render();
            $('#content').html(this.userFriendsView.el);
            $('.nav > li').removeClass('active');
            $('.nav > li.friends-view').addClass('active');
        },
        friendHomeRoute: function (id) {
            if (!this.friendHomeView) {
                this.friendHomeModel = new FriendHomeModel();
                this.friendHomeView = new FriendHomeView({model : this.friendHomeModel});
            }
            this.friendHomeView.render(id);
            $('#content').html(this.friendHomeView.el);
        }
    });
    return AppRouter;
});


