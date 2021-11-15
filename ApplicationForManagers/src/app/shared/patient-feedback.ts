export enum FeedbackState {
    approved,
    rejected,
    pending
}

export class PatientFeedbacks
{
    id: string;
    username: string;
    text: string;
    date: Date;
    state: FeedbackState = FeedbackState.pending;
    anonymous: boolean;
    publish: boolean;
}