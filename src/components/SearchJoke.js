import './SearchJoke.css';
import { useRef, useState } from 'react';
import { Formik, Field, Form, useFormik } from "formik";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SearchResults from './SearchResults';
import SearchHistory from './SearchHistory';


    // A custom validation function. This must return an object
    // which keys are symmetrical to our values/initialValues
    const validate = values => {
        const errors = {}; 
        if (!values.search) {
        errors.search = 'Search term is required';
        } else if (!/^[a-zA-Z]+$/i.test(values.search)) {
        errors.search = 'Invalid search term';
        }
        return errors;
    };

    function SearchJoke(){

        // access the global store of the app
        const searchItems = useSelector((state) => state.searchTerms);
        const dispatch = useDispatch();
        const [jokeResults, setJokeResults] = useState([]);

        // const history = useHistory();
        // Pass the useFormik() hook initial form values and a submit function that will
        // be called when the form is submitted
        const formik = useFormik({
            initialValues: {
            search: '',
            },
            validate,
            onSubmit: values => {
            //dispatching action to our Redux store for storing serach terms in the global state
            dispatch({
                type: "ADD_TO_LIST",
                item: values.search
            });
            // alert(JSON.stringify(values, null, 2));
            fetch(`https://icanhazdadjoke.com/search?term=${values.search}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json"
                    }

                }
            ).then(res => res.json()
            ).then(data => {
                setJokeResults(data);
                })
                .catch(error => console.log(error));
            },
        });
     
    return (
        <>
        <form onSubmit={formik.handleSubmit}>
            <input
                id="search"
                className="input"
                name="search"
                type="search"
                title="Enter your search term"
                aria-label="Enter your search term"
                placeholder="Search Joke"
                maxLength = "10"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.search}
            />
            <button className='search-button' type="submit">Search</button>
        </form>
        {formik.touched.search && formik.errors.search ? (<div className='form-error'>{formik.errors.search}</div>) : null}
        {searchItems.length != 0 &&  <SearchHistory searchHistory = {searchItems} /> }
        { jokeResults.length != 0 && <SearchResults jokeData = {jokeResults} /> }
        </>
    );
}

export default SearchJoke;