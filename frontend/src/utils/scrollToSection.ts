/**
 * Smoothly scrolls to a section with the given ID
 * @param sectionId - The ID of the element to scroll to
 */
export const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
