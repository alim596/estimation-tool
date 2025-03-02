import { Section, SubmissionResponse } from '@/types/types';


//Fetches the questions' data (array of sections).
export async function fetchQuestions(): Promise<Section[]> {
  const response = await fetch('http://localhost:4000/questions/all');
  return response.json();
}

/*
 * Each answer is thought to take one design and one dev hours, 
 * sum and multiply by hourly rate.
*/
export async function createSubmission({
  hourlyRate,
  answers,
}: {
  hourlyRate: number;
  answers: Record<string, string[]>;
}): Promise<SubmissionResponse> {
  const response = await fetch('http://localhost:4000/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hourlyRate, answers }),
  });

  if (!response.ok) {
    throw new Error('Failed to create submission');
  }

  return response.json();
}
 
//fetch a specific submission by its ID.
export async function getSubmission(id: number): Promise<SubmissionResponse> {
  const response = await fetch(`http://localhost:4000/submissions/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch submission');
  }
  return response.json();
}
