import './SearchHistory.css'


function SearchHistory(props) {
 
    const size = -5;
    const terms = props.searchHistory;

    return (
        <div>
            <p>Previously searched terms: </p>
            <ul className="list">
                {terms.slice(size).map((item) => <li>{item}</li> 
                )}
            </ul>
        </div>
    );
}

export default SearchHistory;