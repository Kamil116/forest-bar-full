import React from 'react';
import VacancyCard from "@/components/Coperation/VacancyCards/VacancyCard";
import {Box, Group, ScrollArea} from "@mantine/core";
import { mockVacancies } from "@/data/mockVacancies";
import styles from "./VacancyCards.module.css";

function VacancyCards() {
    return (
        <Box w="100%">
            <ScrollArea 
                classNames={styles} 
                type="auto" 
                offsetScrollbars 
                ml={{ base: 'xs', md: 'xl' }} 
                mr={{ base: 'xs', md: 'xl' }} 
                pb="md"
            >
                <Group wrap='nowrap' gap="xl" align="stretch">
                    {mockVacancies.map((job, index) => <VacancyCard key={index} job={job}/>)}
                </Group>
            </ScrollArea>
        </Box>
    );
}

export default VacancyCards;