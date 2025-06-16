import { Box, Card, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useGetCategories from '../../hooks/useGetSearchCategories'
import LoadingSpinner from '../../common/components/LoadingSpinner';
import ErrorMessage from '../../common/components/ErrorMessage';
import LoginButton from '../../common/components/LoginButton';
import { AxiosError } from 'axios';
import { useInView } from 'react-intersection-observer';

const CategoryContainer = styled(Grid)({
  width: "95%",
  margin: "10px auto",
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
});

const bgColors = [
  "#FF6B6B", // 코랄 핑크
  "#4ECDC4", // 터쿼이즈
  "#45B7D1", // 스카이 블루
  "#96CEB4", // 세이지 그린
  "#FFEAA7", // 소프트 옐로우
  "#DDA0DD", // 플럼
  "#98D8C8", // 민트
  "#F7DC6F", // 골든 옐로우
  "#BB8FCE", // 라벤더
  "#85C1E9", // 라이트 블루
  "#82E0AA", // 라이트 그린
  "#F8C471", // 피치
  "#F1948A", // 로즈
  "#85C1E9", // 아쿠아
  "#C39BD3", // 바이올렛
  "#7FB3D3", // 파우더 블루
  "#90EE90", // 라이트 그린
  "#FFB6C1", // 라이트 핑크
  "#20B2AA", // 라이트 씨 그린
  "#DEB887"  // 버리우드
];

const StyledBox = styled(Card)(({ bgcolor }) => ({
  flex: 1,
  width: "240px",
  maxWidth: "100%",
  height: 150,
  borderRadius: 8,
  cursor: 'pointer',
  backgroundColor: bgcolor || '#1a1a1a',
  overflow: 'hidden',
  display: "flex",

}));
const StyledCardMedia = styled(CardMedia)({
  width: 120,
  height: "100%",
  objectFit: 'cover',
});

const CategoryTitle = styled(Typography)({
  color: 'white',
  fontSize: '1rem',
  lineHeight: 1.2,
  overflow: 'hidden',
  whiteSpace: 'normal',
  wordBreak: 'keep-all', // 한글 단어 단위로 줄바꿈
  overflowWrap: 'break-word', // 긴 단어는 강제 줄바꿈
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
});

const SearchPage = () => {
  const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCategories({ limit: 10, offset: 0 });
  const { ref, inView } = useInView();
  console.log('cate', data);
  const allCategories = data?.pages?.flatMap(page => page.categories.items) || [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage errorMessage="Fail to load playlist" />

  return (
    <div>
      <Typography variant="h1" paddingTop="8px" marginBottom="8px">
        Browse all
      </Typography>
      <Box sx={{
        marginTop: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        height: "calc(100vh - 200px)",
      }}>
        <CategoryContainer container spacing={2}>
          {allCategories.map((category, index) => {
            const bgColor = bgColors[index % bgColors.length];

            return (
              <Grid item key={category.id}>
                <StyledBox
                  bgcolor={bgColor}
                >
                  <Box sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '16px',
                    minWidth: 0,
                  }}>
                    <CategoryTitle variant="h1">
                      {category.name}
                    </CategoryTitle>
                  </Box>
                  {category.icons?.[0]?.url && (
                    <StyledCardMedia
                      component="img"
                      image={category.icons[0].url}
                      alt={category.name}
                    />
                  )}

                </StyledBox>
              </Grid>
            );
          })}
          <div ref={ref} style={{ height: 20, margin: '20px 0' }}>
            {isFetchingNextPage && (
              <Box display="flex" justifyContent="center" width="100%">
                <LoadingSpinner />
              </Box>
            )}
          </div>
        </CategoryContainer>
      </Box>
    </div>
  )
}

export default SearchPage
