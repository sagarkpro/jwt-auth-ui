import { NextResponse } from "next/server";

export const parseResponse = async (response: Response) => {
    const status = response.status;
    const headers = response.headers;

    if (status === 204) {
        return NextResponse.json([], { status });
    }

    if(status === 202){
        return NextResponse.json(true, { status });
    }
    
    const text = await response.text();
    let data;

    try {
        data = text ? JSON.parse(text) : "";
    } catch (error) {
        data = text ?? error; // Fallback to text if JSON parsing fails
    }

    if (status >= 200 && status < 300) {
        return NextResponse.json(data, { headers });
    } else {
        return NextResponse.json(data?.message || data || "Something went wrong", { status, headers });
    }
}
