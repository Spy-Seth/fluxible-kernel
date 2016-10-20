const EnvironementDetector = {
    /**
     * @static
     * @return {Boolean}
     */
    isServerSide: () => {
        return (typeof window === 'undefined');
    },

    /**
     * @static
     * @return {Boolean}
     */
    isClientSide: () => {
        return (typeof window !== 'undefined');
    },
};

export default EnvironementDetector;
