import { Grid, Typography } from '@mui/material'
import useGetNewReleases from '../../../hooks/useGetNewReleases'
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import ErrorMessage from '../../../common/components/ErrorMessage';
import Card from '../../../common/components/Card';

const NewReleases = () => {
    const { data, error, isLoading } = useGetNewReleases();

    if (isLoading) {
        return <LoadingSpinner />
    }
    if (error) {
        return <ErrorMessage errorMessage={error.message} />
    }

    return (
        <div>
            <Typography variant="h1" paddingTop="8px" marginBottom="8px">
                New Released Albums
            </Typography>
            {data && data.albums.items.length > 0
                ? <Grid container spacing={2}>
                    {data.albums.items.map((album) => (
                        <Grid size={{xs:6, sm:4, md: 2}} sx={{ minWidth: "160px" }} key={album.id}>
                            <Card
                                name={album.name}
                                image={album.images[0].url}
                                artistName={album.artists[0].name}
                            />
                        </Grid>
                    ))}
                </Grid>
                : <Typography variant="h2">No Data</Typography>
            }
        </div>
    )
}

export default NewReleases
