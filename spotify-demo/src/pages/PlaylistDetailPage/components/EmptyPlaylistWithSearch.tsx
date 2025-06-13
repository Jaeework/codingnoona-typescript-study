import { Box, styled, Table, TableBody, TableContainer, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import LoadingSpinner from '../../../common/components/LoadingSpinner';
import SearchResultItem from './SearchResultItem';
import { useInView } from 'react-intersection-observer';

const EmptyPlaylistWithSearchContainer = styled("div")({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
});

const SearchSection = styled("div")({
    flexShrink: 0, // 검색 영역 크기 고정
});

const SearchResultContainer = styled(TableContainer)(({ theme }) => ({
    flex: 1,
    overflowY: "auto",
    minHeight: 0,

    "&::-webkit-scrollbar": {
        width: "12px",
    },
    "&::-webkit-scrollbar-track": {
        background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "transparent",
        borderRadius: "0px",
        border: "2px solid transparent",
        transition: "backgroundColor 0.2s ease",
    },
    "&:hover::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
    "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    }

}));

const EmptyPlaylistWithSearch = () => {
    const { ref, inView } = useInView();
    const [keyword, setKeyword] = useState<string>("");
    const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
        q: keyword,
        type: [SEARCH_TYPE.Track],
    });
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    });

    console.log("ddd", data);
    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const hasResults = data?.pages?.some(page =>
        page.tracks?.items && page.tracks.items.length > 0
    );

    const showNoResults = keyword && !isLoading && !hasResults;

    return (
        <EmptyPlaylistWithSearchContainer>
            <SearchSection>
                <Typography variant="h1" my="10px">
                    Let's find something for your playlist
                </Typography>
                <TextField
                    value={keyword}
                    onChange={handleSearchKeyword} />
            </SearchSection>

            <SearchResultContainer>

                {/* 검색어가 있고 로딩 중인 경우 */}
                {isLoading && keyword && (
                    <Box display="flex" justifyContent="center" py={4}>
                        <LoadingSpinner />
                    </Box>
                )}

                {/* 검색어가 있고 로딩 완료됐는데 결과가 없는 경우 */}
                {showNoResults && (
                    <Box textAlign="center" py={4}>
                        <Typography variant="h1" color="text.secondary">
                            No Result for "{keyword}"
                        </Typography>
                    </Box>
                )}


                {/* 검색어가 있고 결과도 있는 경우 */}
                {keyword && hasResults && (
                    <>
                        <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
                            <TableBody>
                                {data?.pages.map((page) =>
                                    page.tracks?.items?.map((track) => (
                                        <SearchResultItem
                                            key={track.id}
                                            track={track}
                                        />
                                    ))
                                )}

                            </TableBody>
                        </Table>
                        { hasNextPage && (
                            <div ref={ref} style={{
                                display: "flex",
                                height: "20px",
                                justifyContent: "center",
                            }}>
                                {isFetchingNextPage && <LoadingSpinner />}
                            </div>
                        )}
                    </>
                )}
            </SearchResultContainer>

        </EmptyPlaylistWithSearchContainer>
    )
}

export default EmptyPlaylistWithSearch
