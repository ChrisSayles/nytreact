//include the axios package for performing HTTP requests(promise based alternative to request)
var axios = require("axios");

//New York Times API
var API_KEY = "8f79ea30c8b64beca636ca6b2267cfba";

var helpers = {
 //run the runQuery function with 3 arguments(topic, startYear, endYear)
    runQuery: function(topic, startYear, endYear){

      //queryURL combined the NYT API URL and API_KEY
      var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + API_KEY + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
 //Axios call to var QueryURL
      return axios.get(queryURL)
      .then(function(response){
        var newResults = [];
        var fullResults = response.data.response.docs;
        var counter = 0;

        //get first 10 articles that have all 3 components
        for(var i = 0; i < fullResults.length; i++){
          if(counter > 9){
            return rewResults;
          }
          if(fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url){
            newResults.push(fullResults[counter]);
            counter++;
          }
        }
        return newResults;
      })
    },

    //this function posts saved articles to out database
    postArticle: function(title, date, url){
      axios.post("/api/saved", {title: title, date: date, url: url})
      .then(function(results){
        console.log("Posted to MongoDB");
      })
    }
    }

//export the helpers function()
module.exports = helpers;