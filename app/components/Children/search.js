// Include React 
var React = require('react');

// Component creation
var Search = React.createClass({

  // enables us to set the intitial state value that is accessible inside the component this.state
  getInitialState: function(){
    return {
      topic: "",
      startYear: "",
      endYear: ""
    }
  },

  // This function will respond to the user input 
  handleChange: function(event){

      // Here we create syntax to capture any change in text to the query terms (pre-search).
      var newState = {};
      //Used for event delegation
      newState[event.target.id] = event.target.value;
      //this.state.newState is set
      this.setState(newState);

  },

  // When a user submits... 
  handleClick: function(){
  
    // Set the parent to have the search term.  This will transfer to Main.js
    this.props.setTerm(this.state.topic, this.state.startYear, this.state.endYear);

  },

  // Here we render what we want to display on our Main.js file
  render: function(){

    return(

      <div className="panel panel-primary-yellow ">
        <div className="panel-body-search">
          <h2 className="panel-title text-center panel-primary-yellow"><strong>Search</strong></h2>
        </div>
        <div className="panel-body-search text-center">

            <form>
              <div className="form-group">
                <h4 className=""><strong>Topic</strong></h4>
                <input type="text" className="form-control text-center" id="topic" onChange= {this.handleChange} required/>
                <br />

                <h4 className=""><strong>Start Year</strong></h4>
                <input type="text" className="form-control text-center" id="startYear" onChange= {this.handleChange} required/>
                <br />

                <h4 className=""><strong>End Year</strong></h4>
                <input type="text" className="form-control text-center" id="endYear" onChange= {this.handleChange} required/>
                <br />
                
                <button type="button" className="btn btn-success search-button" onClick={this.handleClick}>Search</button>
              </div>

            </form>
        </div>
      </div>
    )
  }
});

// Export the component back for use in other files
module.exports = Search;