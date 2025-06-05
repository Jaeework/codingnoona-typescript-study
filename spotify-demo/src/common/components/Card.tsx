import { styled, Typography } from '@mui/material'
import PlayButton from './PlayButton';

const CardContainer = styled("div")(({ theme }) => ({
    padding: "12px",
    borderRadius: "8px",
    width: "100%",
    height: "100%",
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
        transition: "background-color 0.3s ease-in-out",
    },
    "&:hover .overlay": {
        transform: "translate3d(0px, 0px, 0px)",
        opacity: 1,
    }
}));

const AlbumImage = styled("img")({
    width: "100%",
    height: "auto",
    marginBottom: "8px",
})

const Overlay = styled("div")({
    position: "absolute",
    bottom: "20px",
    right: "8px",
    opacity: 0,
    transform: "translate3d(0px, 25px, 0px)",
    transition: "all 0.3s ease-in-out",
});

const EllipsisTypography = styled(Typography)({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "2px 0",
})

interface CardProps {
    name: string | undefined;
    image: string | undefined;
    artistName?: string | undefined;
}

const Card = ({ image, name, artistName }: CardProps) => {
    return (
        <CardContainer>
            <div style={{ position: "relative" }}>
                <AlbumImage src={image} alt={name} />
                <Overlay className="overlay">
                    <PlayButton />
                </Overlay>
            </div>

            <EllipsisTypography variant="h2">{name || "No title"}</EllipsisTypography>
            <EllipsisTypography variant="body1" color="text.secondary">{artistName || "No artist"}</EllipsisTypography>
        </CardContainer>
    )
}

export default Card
