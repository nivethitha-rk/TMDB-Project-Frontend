import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";
import { useFavMutation } from "../../hooks/use-fav";

const MovieCard = ({
  imageURL,
  title,
  description,
  movieId,
  context,
  onMutateSuccess,
}) => {
  const { mutate, isLoading } = useFavMutation();

  const handleMarkAsFav = async () => {
    await mutate(movieId, context === "homepage");
    onMutateSuccess();
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={imageURL}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleMarkAsFav} disabled={isLoading} size="small">
          {context === "homepage" ? "Mark Fav" : "Remove Fav"}
        </Button>
        <Button size="small">Add to Watchlist</Button>
      </CardActions>
    </Card>
  );
};

MovieCard.propTypes = {
  movieId: PropTypes.string,
  imageURL: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  context: PropTypes.oneOf(["homepage", "fav"]),
  onMutateSuccess: PropTypes.func,
};

export default MovieCard;
