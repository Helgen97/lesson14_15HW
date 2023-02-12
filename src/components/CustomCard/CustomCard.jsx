import React from "react";
import Card from "../Card";
import CardContent from "../CardContent";
import CardActions from "../CardActions";
import IconButton from "../IconButton";
import DeleteIcon from "../DeleteIcon";
import EditIcon from "../EditIcon";

const CustomCard = ({
  children,
  handleEditButton,
  handleDeleteButton,
  cardClass,
  canSeeButtons,
}) => {
  return (
    <>
      <Card className={cardClass}>
        <CardContent>{children}</CardContent>
        {canSeeButtons && (
          <CardActions>
            <IconButton size="small" onClick={handleEditButton}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={handleDeleteButton}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default CustomCard;
