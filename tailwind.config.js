module.exports = {
    future: {
        // removeDeprecatedGapUtilities: true,
        // purgeLayersByDefault: true,
    },
    purge: ['./components/**/*.js', './pages/**/*.js', './utils/**/*.js'],
    theme: {
        extend: {},
        screens: {
            sm: '600px',
            md: '850px',
            lg: '960px',
            xl: '960px',
        },
    },
    variants: {},
    plugins: [],
};
