(function(){dust.register("fetchedWishCard",body_0);function body_0(chk,ctx){return chk.write("<div class=\"thumbnail fetchedProduct\">").exists(ctx.get("itemAdded"),ctx,{"block":body_1},null).write("<div class=\"prod-desc\"><a class=\"item_link\" href=\"").reference(ctx.getPath(true,["item_link"]),ctx,"h").write("\" target=\"_blank\"><img class=\"item_image\" src=\"").reference(ctx.getPath(true,["item_image"]),ctx,"h").write("\"></a></div><div class=\"caption\"><p class=\"text-center item_title\">").reference(ctx.getPath(true,["item_title"]),ctx,"h").write("</p></div><div class=\"price-div\"><a class=\"item_link\" href=\"").reference(ctx.getPath(true,["item_link"]),ctx,"h").write("\" target=\"_blank\"><img class=\"pull-left amazon-logo\" src=\"https://images-na.ssl-images-amazon.com/images/G/31/associates/promohub/amazonIN_logo_200_75.jpg?tag-id=giftnwishcom-21\" border=\"0\" alt=\"In Association with Amazon.in\"></a><h4><span class=\"pull-right label label-success price\">").reference(ctx.getPath(false,["pricing","retail"]),ctx,"h").write("</span></h4></div>").exists(ctx.get("itemAdded"),ctx,{"else":body_2,"block":body_3},null).write("</div>");}function body_1(chk,ctx){return chk.write("<span class=\"text-success\"><i class=\"fa fa-check-circle fa-3x pull-right\"></i></span>");}function body_2(chk,ctx){return chk.write("<button class=\"btn btn-primary add-to-wishlist pull-right\" id=\"").reference(ctx.getPath(true,["asin"]),ctx,"h").write("\">Add to Wish List</button>");}function body_3(chk,ctx){return chk.write("<button class=\"btn btn-primary btn-danger btn-remove-from-wishlist pull-right\">Remove from Wishlist</button>");}return body_0;})();