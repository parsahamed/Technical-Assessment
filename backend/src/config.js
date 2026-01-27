/** Server and validation config */
export const config = {
  port: Number(process.env.PORT) || 3001,
  env: process.env.NODE_ENV || 'development',
};

export const VALID_STATUSES = ['draft', 'active', 'completed'];
export const VALID_PHASES = ['Phase 1', 'Phase 2', 'Phase 3'];

export const defaultStatus = 'draft';
export const defaultPhase = 'Phase 1';

/** Workspace / external config — baseDomain and apiVersion for external fetch */
export const assessmentWorkspaceConfig = {
  baseDomain: 'technical-assessment-setting.netlify.app',
  apiVersion: 'api',
};

export function getWorkspaceApiEndpoint() {
  const { baseDomain, apiVersion } = assessmentWorkspaceConfig;
  return `https://${baseDomain}/${apiVersion}`;
}
