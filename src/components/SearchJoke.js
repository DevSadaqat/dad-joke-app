import './SearchJoke.css'
import { useRef, useState } from 'react'
import { Formik, Field, Form, useFormik } from "formik";
import SearchResults from './SearchResults';
import SearchHistory from './SearchHistory';
// import { useHistory } from 'react-router-dom';


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
    const [jokeResults, setJokeResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    // const history = useHistory();
    // Pass the useFormik() hook initial form values and a submit function that will
   // be called when the form is submitted
   const formik = useFormik({
    initialValues: {
      search: '',
    },
    validate,
    onSubmit: values => {
        console.log(values);
      setSearchHistory(values.search);  
      alert(JSON.stringify(values, null, 2));
      fetch(`https://icanhazdadjoke.com/search?term=${values.search}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json"
            }

        }
      ).then(res => res.json()
      ).then(data => {
        console.log(data);
        setJokeResults(data);
        })
        .catch(error => console.log(error));
    },
  });
    
    // const [ invalidForm, setInvalidForm ] = useState(false);
    // const [ errorMessage, setErrorMessage ] = useState("");
    // const searchInputRef = useRef();
    // function submitHandler(event) {
    //     //prevent browser default to send request to the server 
    //     event.preventDefault();

    //     const enteredTerm = searchInputRef.current.value;

    //     if(!enteredTerm){
    //         setInvalidForm(true);
    //         setErrorMessage("Search term is required");
    //         return;
    //     }

    //     console.log(enteredTerm);
    //     const data = {
    //         searchTerm: enteredTerm
    //     }

    //     console.log(data);
    // }  
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
         { jokeResults.length != 0 && <SearchResults jokeData = {jokeResults} /> }
         {searchHistory.length != 0 &&  <div>{searchHistory}</div> }
        </>

     
        // <form className='search-bar' onSubmit={submitHandler}>
        //     <label htmlFor="header-search">
        //         <span className="visually-hidden">Search for jokes</span>
        //     </label>
        //     <input
        //         type="text"
        //         className='input'
        //         placeholder="Search for jokes"
        //         maxLength = "10"
        //         ref={searchInputRef}
        //     />
        //     {invalidForm && <div className='form-error'> {errorMessage} </div>}
        //     <button className='search-button'>Search</button>
        // </form>
    );
}

export default SearchJoke;