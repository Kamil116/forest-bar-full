import React, { useEffect } from 'react';
import { Box } from '@mantine/core';
import { HomePage } from './HomePage';
import CooperationPage from './CooperationPage';
import VendorsPage from '@/pages/VendorsPage/VendorsPage';
import Recipe from './Recipe/Recipe';
import PopularPage from './Popular/PopularPage';
import Footer from '@/components/shared/Footer';

export function LandingPage() {
    useEffect(() => {
        // Добавляем плавный скролл для всего документа
        document.documentElement.style.scrollBehavior = 'smooth';

        return () => {
            // Очищаем стили при размонтировании
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    return (
        <Box>
            <Box id="home-section">
                <HomePage />
            </Box>
            <Box id="popular-section">
                <PopularPage />
            </Box>
            <Box id="recipe-section">
                <Recipe />
            </Box>
            <Box id="about-us">
                <VendorsPage />
            </Box>
            <Box id="cooperation-section">
                <CooperationPage />
            </Box>
            <Footer />
        </Box>
    );
}
