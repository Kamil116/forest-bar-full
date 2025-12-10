import { useMantineTheme, Box } from '@mantine/core';
import { Hexagon } from './Hexagon';
import classes from './HexagonGrid.module.css';

interface HexagonGridProps {
    rows?: number;
    cols?: number;
    hexagonSize?: number;
    gap?: number;
    colors?: string[];
    glowProbability?: number; // 0-1, probability of a hexagon having glow effect
    align?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

export function HexagonGrid({
    rows = 6,
    cols = 8,
    hexagonSize = 80,
    gap = 4,
    colors,
    glowProbability = 0.3,
    align = 'center',
}: HexagonGridProps) {
    const theme = useMantineTheme();
    
    // Default colors with warm yellow/orange variations
    const defaultColors = [
        theme.other.customOrange, // rgba(247, 187, 26, 1)
        theme.other.customYellow, // rgba(219, 166, 25, 1)
        'rgba(255, 200, 87, 1)', // Lighter yellow
        'rgba(230, 180, 50, 1)', // Medium yellow-orange
        'rgba(255, 215, 120, 1)', // Very light yellow
        'rgba(240, 190, 60, 1)', // Golden yellow
    ];

    const hexagonColors = colors || defaultColors;
    
    // Calculate spacing for honeycomb pattern
    // For hexagons created with clip-path from squares:
    // - Horizontal spacing = size * 0.866 (sqrt(3)/2) gives proper overlap
    // - Vertical spacing = size * 0.75 for proper row alignment
    // - Odd rows offset by half horizontal spacing
    const horizontalSpacing = hexagonSize * 0.866 + gap;
    const verticalSpacing = hexagonSize * 0.75 + gap;
    const horizontalOffset = hexagonSize * 0.433; // Half of horizontal spacing

    // Generate hexagons
    const hexagons: Array<{ row: number; col: number; color: string; glow: boolean }> = [];
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const randomColor = hexagonColors[Math.floor(Math.random() * hexagonColors.length)];
            const hasGlow = Math.random() < glowProbability;
            
            hexagons.push({
                row,
                col,
                color: randomColor,
                glow: hasGlow,
            });
        }
    }

    // Calculate total grid dimensions
    const totalWidth = (cols - 1) * horizontalSpacing + hexagonSize + horizontalOffset;
    const totalHeight = (rows - 1) * verticalSpacing + hexagonSize;

    // Determine alignment styles
    const getAlignmentStyles = () => {
        switch (align) {
            case 'top-left':
                return { justifyContent: 'flex-start', alignItems: 'flex-start' };
            case 'top-right':
                return { justifyContent: 'flex-end', alignItems: 'flex-start' };
            case 'bottom-left':
                return { justifyContent: 'flex-start', alignItems: 'flex-end' };
            case 'bottom-right':
                return { justifyContent: 'flex-end', alignItems: 'flex-end' };
            default:
                return { justifyContent: 'center', alignItems: 'center' };
        }
    };

    const alignmentStyles = getAlignmentStyles();

    return (
        <Box className={classes.gridContainer} style={alignmentStyles}>
            <Box
                className={classes.grid}
                style={{
                    width: `${totalWidth}px`,
                    height: `${totalHeight}px`,
                }}
            >
                {hexagons.map((hex, index) => {
                    const isOddRow = hex.row % 2 === 1;
                    // Calculate position with proper honeycomb offset
                    const x = hex.col * horizontalSpacing + (isOddRow ? horizontalOffset : 0) + hexagonSize / 2;
                    const y = hex.row * verticalSpacing + hexagonSize / 2;

                    return (
                        <Box
                            key={`${hex.row}-${hex.col}-${index}`}
                            className={classes.hexagonWrapper}
                            style={{
                                left: `${x}px`,
                                top: `${y}px`,
                            }}
                        >
                            <Hexagon
                                size={hexagonSize}
                                color={hex.color}
                                glow={hex.glow}
                            />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
