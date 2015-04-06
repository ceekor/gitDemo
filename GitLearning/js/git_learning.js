$(function(){
	// after the document is ready, load the actived item automatically
	LoadContent();

	//sidebar-navigation
	$(".nv_item").click(function(){
		var navEL = $(this),
			nvContainerEL = navEL.closest("nav");

		var elToLoad = navEL;

		//set the style for the selected node
		$("#leftSbar").find(".actived").removeClass("actived");
		navEL.addClass("actived");

		
		if(nvContainerEL.hasClass("sub_nav")){	// active parent node when selecting any sub node 
			nvContainerEL.closest("li").addClass("actived");
		}
		else if(navEL.hasClass("w_nodes")){	// active first sub node when selecting parent node
			var firstEL = navEL.find(".nv_item:eq(0)");
			firstEL.addClass("actived");

			elToLoad = firstEL;
		}

		LoadContent(elToLoad);
		return false;	//required! to stop propagation
	});	
	
});

//load the content for target nav
function LoadContent(navEL){
	if(!navEL){
		navEL = $("#leftSbar").find(".actived:last");
	}
	
	var targetInfo = navEL.attr("data-info");

	var arctlContainerEL = $("#main"),
		allArticles = arctlContainerEL.find(".artl_item"),
		targetArticleEL = allArticles.filter(function(){
			return $(this).attr("data-info") == targetInfo;
		});

	if(targetArticleEL.length == 0){
		targetArticleEL = $("<article />", {
			"class": "artl_item",
			"data-info": targetInfo
		});	
		targetArticleEL.appendTo(arctlContainerEL).load("res/"+targetInfo+".htm", function(){
			targetArticleEL.find("code.cmd").prepend("<span class='cmd_pmpt'>$</span>");
		});
	}

	allArticles.hide();
	targetArticleEL.show();
}