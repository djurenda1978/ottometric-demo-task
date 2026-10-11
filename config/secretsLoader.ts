import { config } from 'dotenv';

// CI environment variables take precedence over the optional local file.
config({ quiet: true });

// Read required secrets only when a scenario needs them.
export function getDataFromSecret(key: string): string {
    const secret = process.env[key];
    if (!secret) {
        throw new Error(`Missing secret environment variable: ${key}`);
    }
    return secret;
}
