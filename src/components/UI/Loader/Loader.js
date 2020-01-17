import React from "react";
import classes from "./Loader.css"

export default props => {
    return (
        <div className={classes.LoaderWrapper}>
            <div className={classes.Loader}>
                <div></div>
                <div/>
            </div>
        </div>
    )
}