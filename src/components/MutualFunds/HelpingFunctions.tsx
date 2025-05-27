"use client"
import { toast } from "react-toastify";

export const validateData = async (access_token: any, body: any) => {
    const url = `https://api.wealthup.me/api/v1/cybrilla/orders/validate`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            const errorMessage =
                data?.errors[0] ||
                data?.error?.errors?.[0]?.message ||
                data?.error?.message ||
                response.statusText ||
                `Error ${response.status}: Something went wrong.`;
            toast.error(errorMessage);
        }
    } catch (error) {
        console.error('Error fetching funds:', error);
        toast.error('Failed to fetch funds');
        return [];
    }
}

export const mandateCreate = async (access_token: any, body: any) => {
    const url = `https://api.wealthup.me/api/v1/cybrilla/mandate/create`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            const errorMessage =
                data?.error?.errors?.[0]?.message ||
                data?.error?.message ||
                data?.error ||
                response.statusText ||
                `Error ${response.status}: Something went wrong.`;
            toast.error('Payment Error:', errorMessage)
        }
    } catch (error) {
        console.error('Error fetching funds:', error);
        toast.error('Failed to fetch funds');
        return [];
    }
}

export const fetchFunds = async (searchQuery = '', access_token: string) => {
    try {
        if (!access_token) {
            toast.error("Authentication token not found. Please login again.");
            return [];
        }

        const response = await fetch(
            `https://api.wealthup.me/api/v1/cybrilla/funds/schemes?search=${searchQuery}`,
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                }
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch funds');
        }

        const { data } = await response.json();
        return data.map((fund: { isin: any; full_name: any; nav: any; id: any; }) => ({
            value: fund.isin,
            label: fund.full_name,
            fullName: fund.full_name,
            nav: fund.nav,
            id: fund.id,
        }));
    } catch (error) {
        console.error('Error fetching funds:', error);
        toast.error('Failed to fetch funds');
        return [];
    }
};

export const debounce = (func: any, delay: any) => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    return (...args: any) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

export const fetchMandatelist = async (access_token: any) => {
    const url = `https://api.wealthup.me/api/v1/cybrilla/mandate/list`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            const errorMessage =
                data?.error?.errors?.[0]?.message ||
                data?.error?.message ||
                data?.error ||
                response.statusText ||
                `Error ${response.status}: Something went wrong.`;
            console.error('Payment Error:', errorMessage)
            toast.error('Payment Failed! Contact Support');
        }
    } catch (error) {
        console.error('Error fetching funds:', error);
        toast.error('Failed to fetch funds');
        return [];
    }
}

export const getRecommendedFunds = async (access_token: string, type: string) => {
    const url = `https://api.wealthup.me/api/v1/cybrilla/funds/recommend?type=${type}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            return data?.funds;
        } else {
            const errorMessage =
                data?.error?.errors?.[0]?.message ||
                data?.error?.message ||
                data?.error ||
                response.statusText ||
                `Error ${response.status}: Something went wrong.`;
            console.error('Kyc Status Error:', errorMessage)
        }
    } catch (error) {
        console.error('Error fetching Status:', error);
        return [];
    }
}

export const getISINDetails = async (access_token: string, isin: string) => {
    const url = `https://api.wealthup.me/api/v1/cybrilla/funds/scheme/${isin}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            const errorMessage =
                data?.error?.errors?.[0]?.message ||
                data?.error?.message ||
                data?.error ||
                response.statusText ||
                `Error ${response.status}: Something went wrong.`;
            console.error('Kyc Status Error:', errorMessage)
        }
    } catch (error) {
        console.error('Error fetching Status:', error);
        return [];
    }
}

export const getOrderDetails = async (access_token: string, orderId: string, type: string, plan: string) => {
    const url = `https://api.wealthup.me/api/v1/cybrilla/orders/fetch?type=${type}&plan=${plan}&orderIds=${orderId}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            const errorMessage =
                data?.error?.errors?.[0]?.message ||
                data?.error?.message ||
                data?.error ||
                response.statusText ||
                `Error ${response.status}: Something went wrong.`;
            console.error('Kyc Status Error:', errorMessage)
        }
    } catch (error) {
        console.error('Error fetching Status:', error);
        return [];
    }
}

export const getKycStatus = async (access_token: string) => {
    const url = `https://api.wealthup.me/api/v1/cybrilla/kyc/status`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            const errorMessage =
                data?.error?.errors?.[0]?.message ||
                data?.error?.message ||
                data?.error ||
                response.statusText ||
                `Error ${response.status}: Something went wrong.`;
            console.error('Kyc Status Error:', errorMessage)
        }
    } catch (error) {
        console.error('Error fetching Status:', error);
        return [];
    }
}

export const getFolioNumber = (folioData: any, searchKey: any) => {
    return folioData.hasOwnProperty(searchKey) ? folioData[searchKey] : '';
};

export const mandateAuth = async (access_token: string, ids: any) => {
    const url = `https://api.wealthup.me/api/v1/cybrilla/mandate/auth`;
    const body = {
        id: ids,
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            const errorMessage =
                data?.error?.errors?.[0]?.message ||
                data?.error?.message ||
                data?.error ||
                response.statusText ||
                `Error ${response.status}: Something went wrong.`;
            console.error('Payment Error:', errorMessage)
        }
    } catch (error) {
        console.error('Error fetching funds:', error);
        toast.error('Failed to fetch funds');
        return [];
    }
}
