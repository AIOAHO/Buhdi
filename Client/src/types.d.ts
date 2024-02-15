// src/types.d.ts

export interface EnneagramResultsParams {
    highestScoreType: string | null;
    typeScores: Record<string, number>;
   }

   declare module "*.png" {
    const value: any;
    export default value;
  }