	/**********************************
	Add a group of scripts/stylesheets

	Info
	[-] 	Pass this funciton an array of JS and CSS file urls and it will load them all
			and return a promise that resolves after all of the JS files are loaded. See
			image-gallery-control for an example of how it's used.
			
	Notes
	[1] 	Note that there's no promise/callback for these, so the success/failure of
			loading the css files doesn't effect this at all (see notes for addStylesheet)
	[2] 	Note that if any of these fail this promise fails, even though some might
			have succeeded in loading
	**********************************/
	function getStuff(urls){
		return new Promise(function(resolve,reject){
			var urls_css = urls.filter(function(u){return u.indexOf('.css') !== -1});
			var urls_js = urls.filter(function(u){return u.indexOf('.js') !== -1});
			urls.forEach(function(s){
				if(urls_js.indexOf(s) === -1 && urls_css.indexOf(s) === -1){
					log('Globals.getStuff Error: don\'t recognize this url as CSS or JS - ' + s);
				}
			})
			if(urls_css.length > 0){
				urls_css.forEach(function(url){
					addStylesheet(url); /*[1]*/
				})				
			}
			if(urls_js.length > 0){
				var jsPromises = [];
				urls_js.forEach(function(url){
					jsPromises.push(addScript(url));
				})
				Promise.all(jsPromises) /*[2]*/
					.then(resolve)
					.catch(reject);
			}
			else if (urls_css.length > 0){
				resolve();
			}
			else{
				log('Globals.getStuff Error: no files provided were recognized as JS or CSS');
				reject();
			}
		});
	}