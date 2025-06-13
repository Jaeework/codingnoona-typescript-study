import { Box, Button, styled, TableCell, TableRow, Typography } from "@mui/material";
import { Track } from "../../../models/track";

interface SearchResultItemProps {
    track: Track;
}

const SearchResultTableRow = styled(TableRow)(({ theme }) => ({
    width: "100%",
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
    "& .MuiTableCell-root": {
        borderBottom: "none",
    },
}));

const ResultBox = styled(Box)({
    display: "flex",
    alignItems: "center",
});

const ResultCoverImage = styled("img")({
    borderRadius: "4px",
    width: "50px",
    height: "50px",
    marginRight: "15px",
});

const DefaultImage = styled(Box)(({theme}) => ({
    backgroundColor: "#333",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50px",
    aspectRatio: "1",
}));

const ResultTitleTypo = styled(Typography)({
    fontWeight: "700",
});

const ResultArtistTypo = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: "500",
}));

const SearchResultItem = ({ track }: SearchResultItemProps) => {
    const handleAddToPlaylist = () => {
        console.log("Add playlist:", track.name);
    };

    return (
        <SearchResultTableRow>
            <TableCell>
                <ResultBox>
                    <Box sx={{
                        display: { xs: "none", md: "table-cell" }
                    }}>
                        {track.album?.images?.[0]?.url ? (
                            <ResultCoverImage
                                src={track.album.images[0].url}
                                alt="cover image"
                            />
                        ) : (
                            <DefaultImage>
                                <Typography variant="caption" color="text.secondary">
                                    ♪
                                </Typography>
                            </DefaultImage>
                        )}
                    </Box>
                    <Box>
                        <ResultTitleTypo>{track.name}</ResultTitleTypo>
                        <ResultArtistTypo>
                            {track.artists?.[0].name || "Unknown Artist"}
                        </ResultArtistTypo>
                    </Box>
                </ResultBox>
            </TableCell>
            <TableCell sx={{
                display: { xs: "none", md: "table-cell" }
            }}>{track.album?.name || "Unknown Album"}</TableCell>
            <TableCell>
                <Button onClick={handleAddToPlaylist}>추가하기</Button>
            </TableCell>
        </SearchResultTableRow>
    );
};

export default SearchResultItem;
