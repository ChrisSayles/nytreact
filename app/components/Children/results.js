//include React
var React = require("react");

//Component creation.  Initial state has title, date, url, results set to empty
var Results = React.createClass({
	getInitialState: function(){
		return{
			title: "",
			date: "",
			url: "",
			results: []
		}
	},

	//when user clicks save article this.props.saveArticle recieves new value
	clickToSave: function(result){
		this.props.saveArticle(result.headline.main, result.pub_date, result.web_url);
	},
// called when props have changed and when this is not an initial rendering
//enables us to update the state dependeing on the existing and upcoming props
	componentWillReceiveProps: function(nextProps){
		var that = this;
		var myResults = nextProps.results.map(function(search, i){
			var boundClick = that.clickToSave.bind(this, search);
			return <div className="list-group-item" key={i}><a href={search.web_url} target="_blank">{search.headline.main}</a><br />{search.pub_date}<br /><button type="button" className="btn btn-warning" style={{'float': 'right', 'marginTop': '-39px'}} onClick={boundClick}>Save</button></div>
		});
		this.setState({results: myResults});
	},

	//render function that will be displayed via Main.js
	render: function(){
		return(
			<div className = "panel panel-warning">
			 <div className = "panel-heading">
			 	<h3 className = "panel-title text-center"><strong>Results</strong></h3>
			 </div>
			 <div className ="panel-body">
			 	{this.state.results}
			 </div>
			</div>
			)
	}
});

//export the component back to other files for use
module.exports = Results;