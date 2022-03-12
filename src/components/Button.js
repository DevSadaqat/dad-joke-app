import './Button.css';

function Button(props) {
    return (
        <div className='actions'>
            <button type="button" onClick={props.onClickJokeFunction} >Get A Joke!</button>
        </div>
    );
}

export default Button;