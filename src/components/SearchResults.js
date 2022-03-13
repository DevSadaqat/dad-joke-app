import './SearchResults.css';

function SearchResults(props) {

    const totalJokes = props.jokeData.total_jokes;
    const searchTerm = props.jokeData.search_term;
    const results = props.jokeData.results;

    return (
        <div className='results-table'>
            <h2> {totalJokes} jokes found for the search term {searchTerm}</h2> 
                <table>
                    <thead>
                        <tr>
                            <th>Jokes</th>
                        </tr>
                    </thead>
                    <tbody>
                            {results.map(jokes => <tr><th>{jokes.joke}</th></tr>)}   
                    </tbody>
                </table>
        </div>
    );
}

export default SearchResults;