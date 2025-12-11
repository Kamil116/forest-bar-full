/**
 * API Configuration
 * Uses relative URLs in production (via nginx proxy)
 * Falls back to localhost for development
 */
const getApiBaseUrl = (): string => {
    // In production, use relative URL which will be proxied by nginx
    if (import.meta.env.PROD) {
        return '/api';
    }
    // In development, use localhost
    return 'http://localhost:8000';
};

export const API_BASE_URL = getApiBaseUrl();

