import { ActionIcon, Group } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface NavigationArrowsProps {
    onPrevious?: () => void;
    onNext?: () => void;
}

export function NavigationArrows({
    onPrevious,
    onNext,
}: NavigationArrowsProps) {
    return (
        <Group
            gap="md"
            justify="center"
            mt="lg"
            style={{ position: 'relative', zIndex: 3 }}
        >
            <ActionIcon
                variant="transparent"
                size={60}
                onClick={onPrevious}
                style={{
                    color: 'rgba(139, 69, 19, 1)',
                    cursor: 'pointer',
                    width: 'clamp(32px, 5vw, 60px)',
                    height: 'clamp(32px, 5vw, 60px)',
                }}
            >
                <IconChevronLeft style={{ width: 'clamp(32px, 5vw, 60px)', height: 'clamp(32px, 5vw, 60px)' }} />
            </ActionIcon>
            <ActionIcon
                variant="transparent"
                size={60}
                onClick={onNext}
                style={{
                    color: 'rgba(139, 69, 19, 1)',
                    cursor: 'pointer',
                    width: 'clamp(32px, 5vw, 60px)',
                    height: 'clamp(32px, 5vw, 60px)',
                }}
            >
                <IconChevronRight style={{ width: 'clamp(32px, 5vw, 60px)', height: 'clamp(32px, 5vw, 60px)' }} />
            </ActionIcon>
        </Group>
    );
}
