import './SearchResults.css';

function SearchResults(props) {

    const totalJokes = props.jokeData.total_jokes;
    const searchTerm = props.jokeData.search_term;
    const results = props.jokeData.results;

    return (
        <div>
            <h2> {totalJokes} jokes found for the search term {searchTerm}</h2> 
            <div className='search-results'>
                   
                <table>
                    <thead>
                        <tr>
                            <th>Joke</th>
                        </tr>
                    </thead>
                    <tbody>
                            {results.map(jokes => <tr><th>{jokes.joke}</th></tr>)}   
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SearchResults;