export type StudyStatus = 'draft' | 'active' | 'completed';

export interface Study {
  id: string;
  title: string;
  status: StudyStatus;
  phase: string;
  createdAt: string;
}

export interface CreateStudyInput {
  title: string;
  status?: StudyStatus;
  phase?: string;
}

export interface UpdateStudyInput {
  title?: string;
  status?: StudyStatus;
  phase?: string;
}
