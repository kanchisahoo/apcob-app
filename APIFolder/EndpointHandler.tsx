export const authApi = async (
    url: string,
    data: Record<string, any> = {},
    headers: Record<string, string> = {}
) => {
    try {
        const bodyData = new URLSearchParams(data).toString();

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic Y29tbW9uLWFkbWlucy1vYXV0aDItY2xpZW50OmNvbW1vbi1hZG1pbnMtb2F1dGgtcGFzc3dvcmQ=",
                // "Geo-Location":
                //     "eyJkZXZpY2UiOiJXRUIiLCJsYXRpdHVkZSI6MjAuMzQxOTkzMywibG9uZ2l0dWRlIjo4NS44MDYyMTk2LCJjaXR5IjoiQmh1YmFuZXNod2FyIiwiY291bnRyeSI6IkluZGlhIiwiY29udGluZW50IjoiQXNpYSJ9",
                ...headers,
            },
            body: bodyData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            return { success: false, error: errorText || "Something went wrong!" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Unable to connect. Please check your internet.",
        };
    }
};
export const fetchFeatreApi = async (
    url: string,
    data: Record<string, any> = {},
    headers: Record<string, string> = {}
) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "pass_key":
                    "QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA",
                ...headers,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return { success: false, error: errorText || "Something went wrong!" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Unable to connect. Please check your internet.",
        };
    }
};
export const startProcessInstanceApi = async (
    url: string,
    data: Record<string, any> = {},
    headers: Record<string, string> = {}
) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "pass_key":
                    "QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA",
                ...headers,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return { success: false, error: errorText || "Something went wrong!" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Unable to connect. Please check your internet.",
        };
    }
};
export const getformSchemaApi = async (
    url: string,
    data: Record<string, any> = {},
    headers: Record<string, string> = {}
) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "pass_key":
                    "QC62FQKXT2DQTO43LMWH5A44UKVPQ7LK5Y6HVHRQ3XTIKLDTB6HA",
                ...headers,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return { success: false, error: errorText || "Something went wrong!" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Unable to connect. Please check your internet.",
        };
    }
};
export const loginApi = async (
    url: string,
    data: Record<string, any> = {},
    headers: Record<string, string> = {}
) => {
    try {
        // const bodyData = new URLSearchParams(data).toString();

        const response = await fetch(url, {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",
                "Authorization": "Basic Y29tbW9uLWFkbWlucy1vYXV0aDItY2xpZW50OmNvbW1vbi1hZG1pbnMtb2F1dGgtcGFzc3dvcmQ=",
                // "Geo-Location":
                //     "eyJkZXZpY2UiOiJXRUIiLCJsYXRpdHVkZSI6MjAuMzQxOTkzMywibG9uZ2l0dWRlIjo4NS44MDYyMTk2LCJjaXR5IjoiQmh1YmFuZXNod2FyIiwiY291bnRyeSI6IkluZGlhIiwiY29udGluZW50IjoiQXNpYSJ9",
                ...headers,
            },
              body: JSON.stringify(data),
        });

       if (!response.ok) {
    let errorMessage;
    try {
        errorMessage = await response.json();
    } catch {
        errorMessage = await response.text();
    }
    return { success: false, error: JSON.stringify(errorMessage) };
}


        const result = await response.json();
        return { success: true, data: result };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Unable to connect. Please check your internet.",
        };
    }
};
