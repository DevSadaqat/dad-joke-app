import './SearchHistory.css'


function SearchHistory(props) {
 
    const size = -5;
    const terms = props.searchHistory;
    let searchTermsCount = 0; 

    return (
        <div>
            <p>Previously searched terms: </p>
            <ul className="list">
                {terms.slice(size).map((item) => <li key={searchTermsCount += 1}>{item}</li> 
                )}
            </ul>
        </div>
    );
}

export default SearchHistory;