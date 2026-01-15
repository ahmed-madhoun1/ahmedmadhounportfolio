
// Map specific project names to their folder/file paths in assets
const PROJECT_ASSET_MAP: Record<string, string> = {
    'Event Masters': 'event masters',
    'POMOFIY': 'promofy',
    'Zaheed': 'zaheed',
    'Eventorio': 'eventiro',
    'Tab Tactical Analysis Board': 'tab', // Fix case sensitivity if needed ("TAB" vs "Tab")
    'TAB Tactical Analysis Board': 'tab',
    'Cue': 'cue.png',
    'Mataeim': 'mataiem.png',
    'Aman': 'aman.png',
};

// Import all images from assets directory
const globalImages = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,svg}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;


export const getProjectImages = (projectName: string): string[] => {
    const key = PROJECT_ASSET_MAP[projectName];
    if (!key) return [];

    // If it maps to a single file (ends with extension)
    if (key.match(/\.(png|jpg|jpeg|svg)$/)) {
        const fullPath = `/src/assets/${key}`;
        return globalImages[fullPath] ? [globalImages[fullPath]] : [];
    }

    // Otherwise treat it as a folder
    const folderPath = `/src/assets/${key}`;
    const images = Object.keys(globalImages)
        .filter(path => path.includes(folderPath))
        .map(path => globalImages[path]);

    return images;
};

export const getProjectCover = (projectName: string): string | undefined => {
    const images = getProjectImages(projectName);
    if (images.length === 0) return undefined;

    // Custom cover selection (User requested 2nd image for these)
    if (projectName === 'Event Masters' || projectName === 'POMOFIY') {
        return images.length > 1 ? images[1] : images[0];
    }

    return images[0];
};
