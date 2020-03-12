(this["webpackJsonpquick-flick-picker"]=this["webpackJsonpquick-flick-picker"]||[]).push([[0],{43:function(e,t,a){},49:function(e,t,a){e.exports=a.p+"static/media/qfpLogo.48b3d236.png"},50:function(e,t,a){e.exports=a(92)},55:function(e,t,a){},56:function(e,t,a){},67:function(e,t,a){},90:function(e,t,a){},91:function(e,t,a){},92:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(44),r=a.n(s),l=(a(55),a(6)),o=a(7),c=a(9),m=a(8),u=a(10),h=(a(56),a(27)),d=a.n(h);a(66);d.a.initializeApp({apiKey:"AIzaSyAmkko3XAdO0l3amrDc4VMBv9e0xuCfEbo",authDomain:"quickflickpicker.firebaseapp.com",databaseURL:"https://quickflickpicker.firebaseio.com",projectId:"quickflickpicker",storageBucket:"quickflickpicker.appspot.com",messagingSenderId:"981312277648",appId:"1:981312277648:web:489979be7011747edd9c15"});var v=d.a,p=a(16),f=(a(67),a(3)),E=a.n(f),k=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).handleUserInput=function(t){e.setState({userListName:t.target.value})},e.handleUserListName=function(t){(t.preventDefault(),e.state.usersList.find((function(t){return t.key===e.state.userListName})))?E()({title:"You already have a list with that name!",text:"Please create a unique name for your list",button:"OK"}):v.database().ref(e.state.userListName).push(e.state.userListName);e.setState({userListName:""})},e.handleDeleteList=function(t){E()({title:"Are you sure you want to delete the list: ".concat(t,"?"),buttons:["Cancel","Yes please"],dangerMode:!0}).then((function(a){a&&(E()({title:"Your list was deleted!"}),e.state.dbRef.child(t).remove())}))},e.handleReload=function(e){e.preventDefault()},e.handleMovieName=function(e){var t=[];for(var a in e.info)e.info[a]!==e.key&&t.push(e.info[a]);return t},e.handleDeleteMovie=function(e,t){E()({title:"Are you sure you want to delete the movie: ".concat(t.title," from the list: ").concat(e.key,"?"),buttons:["Cancel","Yes please"],dangerMode:!0}).then((function(a){if(a){var n;for(var i in e.info)e.info[i]!==e.key&&e.info[i].id===t.id&&(n=i);v.database().ref(e.key).child(n).remove()}}))},e.handleMovieList=function(e){var t=e.currentTarget,a=t.querySelector(".closeMovies"),n=t.querySelector(".showMovies"),i=t.parentNode.nextElementSibling;null!==i&&i.classList.toggle("activeMovieList"),a.classList.toggle("changeClose"),n.classList.toggle("changeClose")},e.hideLists=function(e){e.preventDefault()},e.state={dbRef:v.database().ref(),usersList:[],userListName:""},e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.state.dbRef.on("value",(function(t){var a=t.val(),n=[];for(var i in a){var s={key:i,info:a[i]};n.push(s)}e.setState({usersList:n})}))}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"yourLists",id:this.props.isHidden},i.a.createElement("div",{className:"wrapper"},i.a.createElement("div",{className:"asideContainer"},i.a.createElement("h2",null,"Your Lists:"),i.a.createElement("form",{className:"listInput",action:"",onSubmit:this.handleUserListName},i.a.createElement("div",{className:"listInputContainer"},i.a.createElement("label",{className:"visuallyHidden",htmlFor:"listName"},"Please enter a list name"),i.a.createElement("input",{onChange:this.handleUserInput,required:!0,type:"text",id:"listName",placeholder:"New list name",value:this.state.userListName})),i.a.createElement("div",{className:"submitButtonContainer"},i.a.createElement("button",{className:"roundButton",type:"submit",title:"Create a new list"},i.a.createElement("i",{className:"fas fa-plus"}))))),i.a.createElement("ul",{className:"movieListContainer"},this.state.usersList.map((function(t){return i.a.createElement("li",{className:"movieList",key:t.key},i.a.createElement("div",{className:"dropDownContainer"},i.a.createElement("div",{className:"dropDownButton",onClick:e.handleMovieList},i.a.createElement("h3",null,t.key),i.a.createElement("p",{className:"showMovies",title:"Open list"},i.a.createElement("i",{className:"fas fa-chevron-down"})),i.a.createElement("p",{className:"closeMovies changeClose",title:"Close list"},i.a.createElement("i",{className:"fas fa-times"}))),i.a.createElement("button",{onClick:function(){e.handleDeleteList(t.key)},className:"deleteListButton",title:"Delete list"},i.a.createElement("i",{className:"fas fa-trash-alt"}))),i.a.createElement("div",{className:"movies"},i.a.createElement("ul",{className:"moviesDisplayed"},0===e.handleMovieName(t).length?i.a.createElement("li",{className:"noMoviesText"}," No movies in this list"):e.handleMovieName(t).map((function(a,n){return i.a.createElement("li",{className:"listItem",key:n},i.a.createElement("p",null,a.title),i.a.createElement("button",{className:"deleteButton",onClick:function(){e.handleDeleteMovie(t,a)},title:"Delete movie"},i.a.createElement("i",{className:"fas fa-trash-alt"})))}))),i.a.createElement("div",{className:"linkContainer"},0!==e.handleMovieName(t).length?i.a.createElement(p.b,{className:"watchMovieBtn",to:"/watch-movie/".concat(t.key)},"Watch Movie"):null)))})))))}}]),t}(n.Component),b=a(30),N=a.n(b),g=a(47),y=a(17),w=a.n(y),O=(a(43),function(e){function t(){return Object(l.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;"undefined"!=typeof this.props.movieID&&w()({url:"https://api.themoviedb.org/3/movie/".concat(this.props.movieID),params:{api_key:"8341ba99fae06408554c7e8411e4a4f9"}}).then((function(t){var a=t.data;e.props.movieDetails(a)})).catch((function(){E()({title:"Something went wrong!! Please try again later!!",button:"OK"})}))}},{key:"render",value:function(){return null}}]),t}(n.Component)),D=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).handleReload=function(e){e.preventDefault()},e.checkIfMovieExist=function(e,t){var a=[];return v.database().ref(e).on("value",(function(t){var n=t.val();for(var i in n)n[i]!==e&&a.push(n[i].id)})),a.indexOf(t)>-1},e.clickHandler=function(t,a){t.preventDefault();var n=v.database().ref(a),i=e.state.movieDetails;if(e.checkIfMovieExist(a,i.id))E()({title:"The movie is already in the list!",button:"OK"});else{var s=i.genres.map((function(e){return e.name})),r={id:i.id,title:i.title,runtime:i.runtime,genre:s};n.push(r),E()({title:"The movie has been added to the list successfully!",button:"OK"})}},e.getMovieDetails=function(t){e.setState({movieDetails:t})},e.state={userLists:[],movieDetails:null},e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;v.database().ref().on("value",(function(t){var a=t.val(),n=[];for(var i in a){var s={key:i};n.push(s)}e.setState({userLists:n})}))}},{key:"render",value:function(){var e=this,t=this.state.userLists;return i.a.createElement("div",{className:"addToLists"},i.a.createElement("div",{className:"listMenu"},i.a.createElement("a",{href:"/",onClick:this.handleReload,className:"roundButton"},i.a.createElement("span",{"aria-hidden":"true"},"+")),i.a.createElement("ul",{className:"listSubMenu moviesDisplayed"},t.map((function(t,a){return i.a.createElement("li",{key:a,className:"listItem",onClick:function(a){e.clickHandler(a,t.key)}},i.a.createElement(O,{movieID:e.props.movieId,movieDetails:e.getMovieDetails}),i.a.createElement("a",{href:"/",className:"listLinks"},t.key))})))))}}]),t}(n.Component),M=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).handleKeyword=function(t){e.setState({keyword:t.target.value})},e.searchForMovies=function(){var t=[];w()({url:"https://api.themoviedb.org/3/search/movie",params:{api_key:"8341ba99fae06408554c7e8411e4a4f9",query:e.state.keyword}}).then((function(a){var n=a.data.results.map(function(){var e=Object(g.a)(N.a.mark((function e(a){var n,i;return N.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w()({url:"https://api.themoviedb.org/3/movie/".concat(a.id),params:{api_key:"8341ba99fae06408554c7e8411e4a4f9"}});case 2:n=e.sent,i=n.data,t.push(i);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());Promise.all(n).then((function(){var a=t.filter((function(e){return null!=e.poster_path&&e.genres.length>0&&null!==e.runtime}));e.setState({movies:a},(function(){0===e.state.movies.length&&E()({title:"No available titles",button:"OK"})}))}))})).catch((function(){E()({title:"Something went wrong!! Please try again later!!",button:"OK"})}))},e.handleSubmit=function(t){t.preventDefault(),e.searchForMovies()},e.state={keyword:"",movies:[]},e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;if("undefined"!=typeof this.props.match.params.keyword){var t=this.props.match.params.keyword;this.setState({keyword:t},(function(){e.searchForMovies()}))}}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"movieSearchArea"},i.a.createElement("div",{className:"wrapper"},i.a.createElement("div",{className:"movieSearchContainer"},0===this.state.movies.length&&"undefined"==typeof this.props.match.params.keyword?i.a.createElement("div",{className:"movieHead"},i.a.createElement("h1",null,"quick flick picker"),i.a.createElement("form",{className:"movieSearchForm",action:"",onSubmit:this.handleSubmit},i.a.createElement("label",{htmlFor:"keywordInput",className:"visuallyHidden"},"enter a keyword to search for a movie"),i.a.createElement("input",{className:"movieSearchBar",type:"text",id:"keywordInput",required:!0,onChange:this.handleKeyword,value:this.state.keyword,placeholder:"Search for a movie..."}),i.a.createElement("button",{className:"watchMovieBtn movieSearchButton",type:"submit"},"find movie"))):i.a.createElement("ul",{className:"moviePosterContainer"},this.state.movies.map((function(t){return i.a.createElement("li",{key:t.id,className:"moviePoster"},i.a.createElement(D,{movieId:t.id}),i.a.createElement(p.b,{key:t.id,to:"/movies/".concat(e.state.keyword,"/ /").concat(t.id)},i.a.createElement("img",{src:"http://image.tmdb.org/t/p/w500/".concat(t.poster_path),alt:t.title})))}))))))}}]),t}(n.Component),L=a(18),S=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).componentDidMount=function(){if("undefined"!=typeof e.props.match.params.keyword){var t=e.props.match.params.keyword;" "!==t&&e.setState({keyword:t})}if("undefined"!=typeof e.props.match.params.listName){var a=e.props.match.params.listName;" "!==a&&e.setState({listName:a})}var n=e.props.match.params.movieID;e.setState({movieId:n}),w()({url:"https://api.themoviedb.org/3/movie/".concat(n,"/credits"),params:{api_key:"8341ba99fae06408554c7e8411e4a4f9"}}).then((function(t){var a=t.data,n=a.crew.filter((function(e){return"Director"===e.job})),i=a.cast.filter((function(e,t){return t<=4}));e.setState({directors:n,cast:i})})).catch((function(){E()({text:"Something went wrong!! Please try again later!!",button:"OK"})})),w()({url:"https://api.themoviedb.org/3/movie/".concat(n,"/videos"),params:{api_key:"8341ba99fae06408554c7e8411e4a4f9"}}).then((function(t){var a=t.data;void 0!==a.results[0]?e.setState({videoLink:"https://www.youtube.com/embed/".concat(a.results[0].key)}):e.setState({videoLink:null})})).catch((function(){E()({text:"Something went wrong!! Please try again later!!",button:"OK"})}))},e.getMovieDetails=function(t){e.setState({movieDetails:t,movieGenre:t.genres})},e.state={movieDetails:{},movieGenre:[],credits:{},directors:[],cast:[],videoLink:"",movieId:"",keyword:"",listName:""},e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("section",{className:"movieDetails"},i.a.createElement("div",{className:"wrapper"},i.a.createElement("div",{className:"movieDetailContainer"},""!==this.state.movieId?i.a.createElement("div",{className:"addButton"},i.a.createElement(D,{movieId:this.state.movieId}),i.a.createElement(O,{movieDetails:this.getMovieDetails,movieID:this.state.movieId})):null,""!==this.state.keyword?i.a.createElement(p.b,{className:"goBack",to:"/quickFlickPicker25/".concat(this.state.keyword)},"Back to results"):null,""!==this.state.listName?i.a.createElement(p.b,{className:"goBack",to:"/watch-movie/".concat(this.state.listName)},"Watch Another Movie"):null,i.a.createElement("div",{className:"detailsPage"},i.a.createElement("div",{className:"posterContainer"},i.a.createElement("img",{src:"http://image.tmdb.org/t/p/w500/".concat(this.state.movieDetails.poster_path),alt:""})),i.a.createElement("div",{className:"movieInfo"},i.a.createElement("h1",{className:"detailTitle"},this.state.movieDetails.title),i.a.createElement("div",{className:"threeDetails"},i.a.createElement("div",{className:"genres"},i.a.createElement("h2",null,"Genres"),this.state.movieGenre.map((function(e,t){return i.a.createElement("p",{key:t},e.name)}))),i.a.createElement("div",{className:"director"},i.a.createElement("h2",null,"Director"),this.state.directors.map((function(e){return i.a.createElement("p",{key:e.credit_id},e.name)}))),i.a.createElement("div",{className:"cast"},i.a.createElement("h2",null,"Cast"),this.state.cast.map((function(e){return i.a.createElement("p",{key:e.credit_id},e.name)})))),i.a.createElement("div",{className:"description"},i.a.createElement("h2",null,"Description"),i.a.createElement("p",null,this.state.movieDetails.overview)),i.a.createElement("div",{className:"trailer"},null===this.state.videoLink?null:i.a.createElement("a",{className:"watchVideo",target:"_blank",rel:"noopener noreferrer",href:this.state.videoLink},"Watch Trailer")))))))}}]),t}(n.Component),C=a(48),j=(a(90),function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).getGenres=function(){var t=[];e.state.ListMovies.forEach((function(e){e.name.genre.forEach((function(e){t.push(e)}))}));var a=t.filter((function(e,a){return t.indexOf(e)===a}));e.setState({listGenres:a})},e.handleSubmit=function(t){t.preventDefault();var a=e.state.selectedGenre;if(""!==e.state.selectedTime&&""!==a){var n=e.state.ListMovies,i=parseInt(e.state.selectedTime),s=n.filter((function(e){return parseInt(e.name.runtime)<=i&&e.name.genre.indexOf(a)>=0}));if(0===s.length)E()({title:"No matches in this list",button:"OK"});else{var r=Math.floor(Math.random()*s.length);e.setState({movieToWatch:s[r].name.id},(function(){e.props.history.push("/movies/ /".concat(e.props.listName,"/").concat(e.state.movieToWatch))}))}}else""===a?E()({title:"Please select a genre!",button:"OK"}):E()({title:"Please select a time!",button:"OK"})},e.handleChange=function(t){var a=t.target.id,n=t.target.value;e.setState(Object(C.a)({},a,n))},e.state={ListMovies:[],listGenres:[],selectedGenre:"",selectedTime:"",movieToWatch:""},e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=v.database().ref(this.props.listName),a=[];t.on("value",(function(t){var n=t.val();for(var i in n)if(n[i]!==e.props.listName){var s={key:i,name:n[i]};a.push(s)}0!==a.length&&e.setState({ListMovies:a},(function(){e.getGenres()}))}))}},{key:"render",value:function(){return i.a.createElement("section",{className:"watchMovie"},i.a.createElement("div",{className:"wrapper"},i.a.createElement("div",{className:"watchMovieContainer"},i.a.createElement("div",{className:"watchMovieHead"},i.a.createElement("h1",null,"watch a movie"),i.a.createElement("form",{action:"",onSubmit:this.handleSubmit},i.a.createElement("div",{className:"genreTimeString"},i.a.createElement("div",{className:"firstString"},i.a.createElement("p",null,"I feel like watching a "),i.a.createElement("select",{id:"selectedGenre",onChange:this.handleChange},i.a.createElement("option",{value:""},"genre"),this.state.listGenres.map((function(e,t){return i.a.createElement("option",{value:e,key:t},e)})))),i.a.createElement("div",{className:"secondString"},i.a.createElement("p",null," movie and I have "),i.a.createElement("select",{id:"selectedTime",onChange:this.handleChange},i.a.createElement("option",{value:""},"amount of time"),i.a.createElement("option",{value:"90"},"Less than 1.5 hours"),i.a.createElement("option",{value:"120"},"Less than 2 hours"),i.a.createElement("option",{value:"240"},"All the time in the world ")))),i.a.createElement("button",{className:"watchMovieBtn findMovieBtn",type:"submit"},"find movie"))))))}}]),t}(n.Component)),I=(a(91),a(49)),B=a.n(I),x=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return(a=Object(c.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(i)))).changeIcon=function(e){"LABEL"===e.target.tagName?e.target.classList.toggle("change"):e.target.parentElement.classList.toggle("change")},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement(p.a,null,i.a.createElement("div",{className:"App"},i.a.createElement("label",{htmlFor:"toggle","aria-hidden":"true",className:"toggle",onClick:this.changeIcon},i.a.createElement("div",{className:"bar1"}),i.a.createElement("div",{className:"bar2"}),i.a.createElement("div",{className:"bar3"})),i.a.createElement("span",{className:"srOnly"},"main menu"),i.a.createElement("input",{type:"checkbox",id:"toggle",autoComplete:"off"}),i.a.createElement("div",{className:"listComponent"},i.a.createElement(k,null)),i.a.createElement(L.a,{path:"/quickFlickPicker25/:keyword?",component:M}),i.a.createElement(L.a,{path:"/movies/:keyword?/:listName?/:movieID",component:S}),i.a.createElement(L.a,{exact:!0,path:"/watch-movie/:listName",render:function(e){return i.a.createElement(j,{listName:e.match.params.listName,key:e.match.params.listName,history:e.history})}}),i.a.createElement("div",{className:"logoAndSearch"},i.a.createElement("a",{href:"/quickFlickPicker25/",title:"Search Movies"},i.a.createElement("i",{className:"fas fa-search"})),i.a.createElement("div",{className:"logoImg"},i.a.createElement("img",{src:B.a,alt:""})))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[50,1,2]]]);
//# sourceMappingURL=main.1f019ce9.chunk.js.map