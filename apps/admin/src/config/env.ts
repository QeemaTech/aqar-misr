export type AdminDataSource = 'mock' | 'api';

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    return undefined;
  }
  return value.trim();
}

/**
 * Admin runtime configuration.
 * Prefer server-only secrets via non-NEXT_PUBLIC_* vars when auth is wired.
 */
export const env = {
  adminUrl: readEnv('NEXT_PUBLIC_ADMIN_URL') ?? 'https://aqar-misr-admin.vercel.app/',
  apiBaseUrl: readEnv('NEXT_PUBLIC_API_URL') ?? 'https://aqar-misr.nodeteam.site/',
  dataSource: (readEnv('ADMIN_DATA_SOURCE') ?? 'mock') as AdminDataSource,
} as const;

export function isApiDataSource(): boolean {
  return env.dataSource === 'api';
}
