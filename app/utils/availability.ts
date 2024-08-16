export const searchAvailability = async (toolCall): Promise<{
    data?: any,
    message: string,
    success: boolean
}> => {
    try {

        const date = JSON.parse(toolCall.function.arguments).date;

        if (!date) {
            return {
                success: false,
                message: "Please provide a valid date to check for availability."
            };
        }

        const response = await fetch(`/api/availabilities?date=${date}`);

        if (!response.ok) {
            return {
                success: false,
                message: "There was an issue checking availability. Please try again."
            };
        }

        const availabilities = await response.json();

        if (availabilities.data.length === 0) {
            return {
                success: false,
                message: `No available slots found for ${date}.`
            };
        }
        
        let availabilityMessage = `Available slots for ${date}:\n`;
        availabilities.data.forEach((slot) => {
            availabilityMessage += `- ${slot.name} at ${new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on ${slot.resourceName} for $${slot.price}\n`;
        });

        return { success: true, data: availabilities.data, message: availabilityMessage };

    } catch (error) {

        console.error("Error in searchAvailability function:", error);
        return {
            success: false,
            message: "An error occurred while checking availability. Please try again later."
        };
        
    }
};