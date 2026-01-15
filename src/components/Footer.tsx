

export const Footer = () => {
    return (
        <footer className="py-8 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} Ahmed Almadhoun. All rights reserved.</p>
            </div>
        </footer>
    );
};
