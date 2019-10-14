const API_URL = 'https://api.themoviedb.org/3/search/movie?api_key=57359ff087905e870d40ba4880a1dce0&query=';
const timer_value = 500;
let timer;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            text: 'oss 117'
        };
    }

    handleTextChange = (e) => {
        this.setState({
            text: e.target.value
        });

        clearTimeout(timer);
        timer = setTimeout(this.handleMovieSearch, timer_value);
    }

    handleMovieSearch = (e) => {
        if(e){e.preventDefault();}

        if (this.state.text) {
            fetch(API_URL + this.state.text)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({
                    items: data.results
                });
            });
        }
    }
		
		componentDidMount = () => {
        this.handleMovieSearch();
    }
		
    render() {
        return <div className='ui main container'>
            <form onSubmit={this.handleMovieSearch} className="ui form">
                <div className="ui input">
                    <div className="field field-input">
                        <input type="text" onChange={this.handleTextChange} ref={input => input && input.focus()} value={this.state.text} />
                    </div>
                    <div className="field field-button">
                        <button className='ui button blue' type="submit">Search movie</button>
                    </div>
                </div>

            </form>
            <List items={this.state.items} />
        </div>
    }
}

class List extends React.Component {
    render(){
        if(this.props.items){
            return <ul className="ui link cards">
                {this.props.items.map(item => <Item key={item.id} title={item.title} rating={item.vote_average} date={item.release_date} overview={item.overview} poster={item.poster_path} /> )}
            </ul>
        } 
    }
}

class Item extends React.Component {
    render(){
        const item = this.props;

        return <li key={item.id} className="card">
            <div className="inner">
                <div className="image">
                    <img src={`http://image.tmdb.org/t/p/w342/${item.poster}`} alt={item.title} />
                </div>
                <div className="content">
                    <h2 className='header'> {item.title} </h2>
                    <p className="date">Date: {item.date}</p>
                    <p className="plot"> {item.overview} </p>
                    <p className="rating">Rating: {item.rating}/10</p>
                </div>
            </div>
        </li>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));