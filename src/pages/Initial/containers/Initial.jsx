import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Link from "components/Link";
import Typography from "components/Typography";
import List from "components/List";
import ListItem from "components/ListItem";
import useAccessValidate from "hooks/useAccessValidate";

const getClasses = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  listItemStyle: {
    margin: "10px",
    boxShadow: "2px 2px 15px 1px black"
  },
}));

const Initial = ({ authorities }) => {
  const classes = getClasses();
  const { availableItems } = useSelector(({ reducer }) => reducer);
  const canSeeList = useAccessValidate({
    ownedAuthorities: authorities,
    neededAuthorities: ["МОЖНО_ДРУГУЮ_ШТУКУ"],
  });

  return (
    <div className={classes.container}>
      <List component="nav">
        {canSeeList &&
          availableItems.map((item) => (
            <ListItem key={item.path} button className={classes.listItemStyle}>
              <Link
                to={(location) => ({
                  ...location,
                  pathname: `/${item.path}`,
                })}
              >
                <Typography>{item.linkText}</Typography>
              </Link>
            </ListItem>
          ))}
        {!canSeeList && <Typography>Не могу ничего показать</Typography>}
      </List>
    </div>
  );
};

export default Initial;
