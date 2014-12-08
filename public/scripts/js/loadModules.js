require(["backbone"], function(Backbone) {
    Backbone.pubSub = _.extend({}, Backbone.Events);
    require(["models/NotificationModel", "views/NotificationView"], function(NotificationModel, NotificationView){

        window.notificationModel        =   new NotificationModel();
        window.notificationView    =   new NotificationView({model : notificationModel});
    });

    // Main Home Page Address Get
    require(["models/UserAddressModel", "views/UserAddressView", "views/UserAddressInModalView"], function(UserAddressModel, UserAddressView, UserAddressInModalView){
        window.userAddressModel = new UserAddressModel();
        window.userAddressInModalView = new UserAddressInModalView({model: userAddressModel});
        window.userAddressView = new UserAddressView({model : userAddressModel});

    });

    // Main Home Page WishList and User Details
    require(["models/UserWishListCollection", "views/UserWishListView", "models/BdayListCollection", "views/BdayListView", "models/UserProfileCardModel", "views/UserProfileCardView", "models/FetchedWishListCollection", "views/FetchedWishListView", "views/SearchWishFormView"], function(UserWishListCollection, UserWishListView, BdayListCollection, BdayListView, UserProfileCardModel, UserProfileCardView, FetchedWishListCollection, FetchedWishListView, SearchWishFormView){
        window.userWishListCollection        = new UserWishListCollection();
        window.userWishListView    = new UserWishListView({collection: userWishListCollection});

        window.bdayListCollection        = new BdayListCollection();
        window.bdayListView    = new BdayListView({collection: bdayListCollection});

        window.userProfileCardModel = new UserProfileCardModel();
        window.userProfileCardView = new UserProfileCardView({model: userProfileCardModel});

        window.fetchedWishListCollection  = new FetchedWishListCollection();
        window.searchWishFormView = new SearchWishFormView({collection: fetchedWishListCollection});
        window.searchWishFormModalView = new SearchWishFormView({collection: fetchedWishListCollection});
        window.fetchedWishListView    = new FetchedWishListView({collection: fetchedWishListCollection});
    });

    // FriendList Page
    require(["models/FriendOverviewCardListCollection", "views/FriendOverviewCardListView","models/BdayListCollection","views/BdayListView"], function(FriendOverviewCardListCollection, FriendOverviewCardListView, BdayListCollection, BdayListView){

    window.friends = {};
    window.friends.friendOverviewCardListCollection        = new FriendOverviewCardListCollection();
    window.friends.friendOverviewCardListView    = new FriendOverviewCardListView({collection: friends.friendOverviewCardListCollection});

    window.friends.bdayListCollection   = new BdayListCollection();
    window.friends.bdayListView    = new BdayListView({collection: friends.bdayListCollection});
    });

    // FriendList Page
    require(["models/FriendAddressModel","views/FriendAddressView","models/FriendProfileCardModel", "views/FriendProfileCardView","models/FriendWishListModel", "views/FriendWishListView"], function(FriendAddressModel,FriendAddressView, FriendProfileCardModel, FriendProfileCardView, FriendWishListModel, FriendWishListView){

        window.friendWL = {};
        window.friendWL.friendAddressModel = new FriendAddressModel();
        window.friendWL.friendAddressView = new FriendAddressView({model: friendWL.friendAddressModel});
        window.friendWL.friendProfileCardModel = new FriendProfileCardModel();
        window.friendWL.friendProfileCardView = new FriendProfileCardView({model: friendWL.friendProfileCardModel});
        window.friendWL.friendWishListModel        = new FriendWishListModel();
        window.friendWL.friendWishListView    = new FriendWishListView({collection:friendWL.friendWishListModel});
    });

});
