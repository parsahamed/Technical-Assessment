/**
 * Loads workspace config from external endpoint and stores it.
 * Called on server startup.
 */
import { getWorkspaceApiEndpoint } from '../config.js';
import { setWorkspaceConfig } from '../data/store.js';

export async function loadWorkspaceConfig() {
  const config = getWorkspaceApiEndpoint();
  try {
    const response = await fetch(config);
    const workSpace = await response.json();
    if (workSpace?.data != null) {
      setWorkspaceConfig(workSpace.data);
    }
  } catch (err) {
    console.warn('[workspace] config fetch failed:', err.message);
  }
}
