export const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function getApiEndpoint(resource: string) {
  return `${apiBaseUrl}${resource}`;
}

export function normalizeCollectionResponse<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;

    if (Array.isArray(record.data)) {
      return record.data as T[];
    }

    if (Array.isArray(record.items)) {
      return record.items as T[];
    }

    const arrayKey = Object.keys(record).find((key) => Array.isArray(record[key]));
    if (arrayKey) {
      return record[arrayKey] as T[];
    }
  }

  return [];
}
