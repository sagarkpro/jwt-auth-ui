/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = process.env.apiBasePath;

interface ApiError {
    error: string;
}

interface ApiService {
    get: (url: string, headers?: any) => Promise<any | ApiError>;
    post: (url: string, data: any, headers?: any) => Promise<any | ApiError>;
    put: (url: string, data: any, headers?: any) => Promise<any | ApiError>;
    delete: (url: string, headers?: any) => Promise<any | ApiError>;
}

export const apiService: ApiService = {
    get: async (url, headers = {}) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${url}`, {
                method: 'GET',
                headers
            });
           
            return await response;
        } catch (error: any) {
            throw new Error(`HTTP error! Status: ${error}`);
        }
    },

    post: async (url, data, headers = {}) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${url}`, {
                method: 'POST',
                headers,
                body: data ? JSON.stringify(data) : null,
            }); 
         
            return await response;
        } catch (error: any) {
            throw new Error(`HTTP error! Status: ${error}`);
        }
    },

    put: async (url, data, headers = {}) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${url}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(data),
            });
           
            return await response;
        } catch (error: any) {
            throw new Error(`HTTP error! Status: ${error}`);
        }
    },

    delete: async (url, headers = {}) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${url}`, {
                method: 'DELETE',
                headers,
            });
          
            return await response;
        } catch (error: any) {
            throw new Error(`HTTP error! Status: ${error}`);
        }
    },
};
