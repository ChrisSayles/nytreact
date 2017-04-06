var React = require('react');

//creating our Saved class
var Saved = React.createClass({

  //defining our initial state value that is accessible in this.state
  getInitialState: function(){
    return {
      term: "",
      startYear: "",
      endYear: ""
    }
  },
  //set the properties on click
  handleClick: function(){
    this.props.setSearch(this.state.term, this.state.startYear, this.state.endYear);
  },
  //set the newState variable to newState upon event change
  handleChange: function(event) {
    var newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  },

  // Here we render the function
  render: function(){

    return(

      <div className="panel panel-success">
        <div className="panel-heading">
          <h3 className="panel-title text-center"><strong>Saved Articles</strong></h3>
        </div>
        <div className="panel-body">
          {this.state.savedArticles}
        </div>
      </div>

    )
  }
});



// Export the component back for use in other files
module.exports = Saved;