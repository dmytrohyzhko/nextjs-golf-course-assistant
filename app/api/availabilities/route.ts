import { GolfAvailability } from "@/app/types/golfAvailability";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
        return NextResponse.json({ success: false, message: "Date is required" }, { status: 400 });
    }

    try {

        const response = await fetch(`https://66b357b77fba54a5b7ec89d3.mockapi.io/api/v1/availabilities`);
        const data: GolfAvailability[] = await response.json();

        if (data.length === 0) {
            return NextResponse.json({ success: false, message: 'No availability found for this date' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data }, { status: 200 });

    } catch (error) {

        return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    }

}