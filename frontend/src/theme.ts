import {createTheme} from '@mantine/core';

export const theme = createTheme({
    fontFamily: 'Comic Helvetic, sans-serif',
    headings: {fontFamily: 'Norse, sans-serif'},
    other: {
        // Colors
        customYellow: 'rgba(219, 166, 25, 1)',
        customYellowShadow: 'rgba(219, 166, 25, 0.69)',
        customOrange: 'rgba(247, 187, 26, 1)',
        darkBackground: 'rgba(27, 16, 21, 1)',
        cardBackground: 'rgba(52, 33, 41, 1)',
        successGreen: 'rgba(112, 187, 129, 1)',
        buttonColor: 'rgba(240, 173, 10, 1)',
        
        // Typography
        titleSize: 48,
        buttonSize: 24,
        textSize: 16,
        
        // Spacing
        cardPadding: 20,
        
        // Border radius
        cardRadius: 15,
        buttonRadius: 'xl'
    }
});
