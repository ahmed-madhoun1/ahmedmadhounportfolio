// Map specific project names to their single image in assets
const PROJECT_ASSET_MAP: Record<string, string> = {
    'PartX': 'projects_images/partx.png',
    'Medace Hub': 'projects_images/medace.png',
    'MED ACE': 'projects_images/medace.png',
    'Medace': 'projects_images/medace.png',
    'Event Masters': 'projects_images/event_masters.png',
    'POMOFIY': 'projects_images/promofy.png',
    'Zaheed': 'projects_images/zaheed.png',
    'Eventorio': 'projects_images/eventorio.png',
    'Tab Tactical Analysis Board': 'projects_images/tab.png',
    'TAB Tactical Analysis Board': 'projects_images/tab.png',
    'TAB - Tactical Analysis Board': 'projects_images/tab.png',
    'Cue': 'cue.png',
    'Mataeim': 'mataiem.png',
    'Aman': 'aman.png',
};

// Import all images from assets directory
const globalImages = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

export const getProjectImages = (projectName: string): string[] => {
    const key = PROJECT_ASSET_MAP[projectName];
    if (!key) return [];

    const fullPath = `/src/assets/${key}`;
    if (globalImages[fullPath]) {
        return [globalImages[fullPath]];
    }

    return [];
};

export const getProjectCover = (projectName: string): string | undefined => {
    const images = getProjectImages(projectName);
    return images[0];
};
