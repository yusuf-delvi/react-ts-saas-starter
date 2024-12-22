export interface User {
  _id: string;
  name: string;
  email: string;
  authType: string;
  isGuideCompleted: boolean;
  isSubscribed: boolean;
}
