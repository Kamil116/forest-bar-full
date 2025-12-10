/**
 * ArrowConnector - Main component that renders arrows between hexagons
 * Automatically switches between mobile and desktop versions based on screen size
 */
import { useMediaQuery } from '@mantine/hooks';
import { ArrowConnectorMobile } from './ArrowConnectorMobile';
import { ArrowConnectorDesktop } from './ArrowConnectorDesktop';

/**
 * Renders an arrow connector between hexagons
 * @param props.direction - 'right-down' for arrows going from top hexagons to bottom, 'right-up' for bottom to top
 */
export function ArrowConnector(props: { direction: 'right-down' | 'right-up' }) {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return isMobile ? (
        <ArrowConnectorMobile direction={props.direction} />
    ) : (
        <ArrowConnectorDesktop direction={props.direction} />
    );
}
