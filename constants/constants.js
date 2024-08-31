/**
 * @fileoverview This module defines a collection of constants used throughout the application.
 * It centralizes various settings and predefined values, such as maximum and minimum lengths for (users) inputs
 * (like usernames and passwords), URLs for social media profiles, confirmation texts for critical actions,
 * and default names for roles. By centralizing these constants, the application ensures consistency and
 * reduces the likelihood of errors associated with the duplication of literal values. This approach also
 * simplifies the process of updating values as changes can be made in one place and reflected throughout
 * the application.
 *
 * The constants are organized into different categories:
 * - `lengths`: Defines the minimum and maximum allowable lengths for various (users) inputs.
 * - `urls`: Provides a central reference for URLs, particularly social media links.
 * - `confirmationText`: Stores specific text for confirmatory actions to prevent accidental submissions.
 * - `defaultName`: Contains default names for certain roles or identifiers in the application.
 */

const lengths = Object.freeze({
    WEBSITE_URL_MAX: 50,

    USERNAME_MIN: 3,
    USERNAME_MAX: 10,

    EMAIL_MIN: 5,
    EMAIL_MAX: 100,

    MOBILE_MIN: 11,
    MOBILE_MAX: 14,

    PASSWORD_MIN: 8,
    PASSWORD_MAX: 30,

    EXTERNAL_AUTH_ID_MAX: 100,

    IMAGE: {
        FILE_ID_MAX: 100,
        SHAREABLE_LINK: 500,
        DOWNLOAD_LINK: 500,
    },

    HEX_COLOR_CODE_MAX: 7,
});

const urls = Object.freeze({
    FACEBOOK: 'https://www.facebook.com',
    TWITTER: 'https://twitter.com',
    LINKEDIN: 'https://linkedin.com',
    GITHUB: 'https://github.com',
});

const confirmationText = Object.freeze({
    deleteUserAccount: 'Delete my account',
});

const defaultName = Object.freeze({
    adminRole: 'Admin',
});

const adminId = '66c87c740f7252ae370a2abd';

const trending = {
    thresholds: {
        BOOKS: 2,
        CATEGORIES: 2,
        PUBLICATIONS: 2,
        WRITERS: 2,
    },
    limit: {
        BOOKS: 10,
        CATEGORIES: 10,
        PUBLICATIONS: 10,
        WRITERS: 10,
    },
};

/**
 * Provides a structured and centralized collection of various constants needed for input validation,
 * configuration of external links, and other hardcoded values that are used across the application.
 * This method of organization helps in maintaining a clean and manageable codebase, promoting reuse,
 * and minimizing hard-coded values scattered throughout the code.
 *
 * @module constants
 * @property {Object} lengths - Contains definitions for input lengths.
 * @property {Object} urls - Centralized social media and other relevant URLs.
 * @property {Object} confirmationText - Texts used for (users) confirmations to avoid accidental actions.
 * @property {Object} defaultName - Default names for roles or identifiers within the application.
 * @description Centralizes important constants for easy maintenance and consistency across the application.
 */
const constants = Object.freeze({
    lengths,
    urls,
    confirmationText,
    defaultName,
    adminId,
    trending,
});

export default constants;
