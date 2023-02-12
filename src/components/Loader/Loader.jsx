import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const getStyles = makeStyles(() => ({
    container: {
        width: "100%",
        margin: "10px",
        padding: "5px",
        textAlign: "center"
    }
}));

const Loader = () => {
    const classes = getStyles();

    return <div className={classes.container}>
        <CircularProgress size={60}/>
    </div>
}

export default Loader;