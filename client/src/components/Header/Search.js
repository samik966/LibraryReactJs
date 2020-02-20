import React from 'react';
import classes from './Search.module.css';

const Search = props =>  {
    return (
        <div className={classes.Search}>
            <input type="text"  onChange = {props.changed} value = {props.searchValue} />
            <button><i className="fa fa-search"></i></button>
        </div>
    );
}



export default Search;
