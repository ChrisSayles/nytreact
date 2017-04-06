//Package Dependency
var axios = require('axios');

// Include React 
var React = require('react');

// Here we include all of the sub-components
var Search = require('./Children/search');
var Results = require('./Children/Results');
var Saved = require('./Children/Saved');

// Helper Function added which contains API KEY, QUERY FUNCTION, POSTS ARTICLES TO MONGO DB
var helpers = require('./utilities/helpers.js');


//Creating the "MAIN" react component. ALL SUBCOMPONENTS WILL BE RENDERED VIA THIS COMPONENT 
var Main = React.createClass({

  // Setting the initial state of the Main class.  Setting topic,startYear,endYear to empty string.  Results and saved Articles are set to empty arrays(Will be filled later in the heirarchy process)
  //With ES6 syntax this would be done in the constructor.
  getInitialState: function(){
    return {
      topic: "",
      startYear: "",
      endYear: "",
      results: [],
      savedArticles: []
    }
  },  

  // We use this function to allow children to update the parent with searchTerms.
  setTerm: function(topic, startYear, endYear){
    this.setState({
      topic: topic,
      startYear: startYear,
      endYear: endYear
    })
  },
  
  //this function is connected to our helpers.js file which uses Axios to post saved articles to our Mongo DB.
  saveArticle: function(title, date, url){
    helpers.postArticle(title, date, url);
    this.getArticle();

  },
  // deleteArticle causes axios request to delete Article and reset the state of savedArticles and bind to this.
  deleteArticle: function(article){
    console.log(article);
    axios.delete('/api/saved/' + article._id)
      .then(function(response){
        this.setState({
          savedArticles: response.data
        });
        return response;
      }.bind(this));

    this.getArticle();
  },
  //Axios request to get a saved article and set the savedArticles and bind to this.
  getArticle: function(){
    axios.get('/api/saved')
      .then(function(response){
        this.setState({
          savedArticles: response.data
        });
      }.bind(this));

  },

  //When a component is updated this function will run.  
  componentDidUpdate: function(prevProps, prevState){
  //if previous topic is different from current topic we will console.log "Updated"
    if(prevState.topic != this.state.topic){
      console.log("UPDATED");
    //use our helpers.js file to run a query for the topic,startYear, and endYear and return the new data.
      helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
        .then(function(data){
          console.log(data);
          console.log("THIS IS DATA");
    //if the old data is not equal to the new data set the state of this.state.results = data
          if (data != this.state.results)
          {
            this.setState({
              results: data
            })
          }
    //bind the this keyword
        }.bind(this))
    }
  },


//Called before the render method is executed.  
  componentDidMount: function(){
    //axios will request data from api/saved
    axios.get('/api/saved')
    //then set the state of this.state.savedArticles to response.data and bind the result to this.
      .then(function(response){
        this.setState({
          savedArticles: response.data
        });
      }.bind(this));
  },

  // Render the function to HTML!
  render: function(){
    return(

      <div className="container">

       
        <div className="row">

          <Search setTerm={this.setTerm}/>

        </div>

        <div className="row">
      
          <Results results={this.state.results} saveArticle={this.saveArticle}/>

        </div>

        <div className="row">
        
          <Saved savedArticles={this.state.savedArticles} deleteArticle={this.deleteArticle} />

        </div>
      </div>
    )
  }
});

module.exports = Main;