import fs from 'fs';
import path from 'path';

import httpStatus from '@/constants/httpStatus.constants';
import configuration from '@/configuration/configuration';
import environment from '@/constants/environment.constants';

import sendResponse from '@/utilities/sendResponse';

export const POST = async (request) => {
    const { id, value } = await request.json();

    const filePath = path.join(process.cwd(), 'constants/patternsArray.json');

    try {
        // Read the existing JSON file
        const fileData = fs.readFileSync(filePath, 'utf8');
        const patterns = JSON.parse(fileData);

        // Find the pattern by ID and update its value
        const updatedPatterns = patterns.map((pattern) =>
            pattern.id === id ? { ...pattern, value } : pattern
        );

        // Write the updated data back to the JSON file
        fs.writeFileSync(
            filePath,
            JSON.stringify(updatedPatterns, null, 2),
            'utf8'
        );

        return sendResponse(
            request,
            true,
            httpStatus.OK,
            'Pattern updated successfully'
        );
    } catch (error) {
        return sendResponse(
            request,
            false,
            httpStatus.INTERNAL_SERVER_ERROR,
            configuration.env !== environment.PRODUCTION
                ? error.message
                : 'Internal Server Error.'
        );
    }
};
