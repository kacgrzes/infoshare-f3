declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      role: "user" | "admin";
    };
  }
}
