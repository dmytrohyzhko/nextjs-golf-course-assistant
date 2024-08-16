export interface GolfAvailability {
    idType: number;
    max: number;
    min: number | null;
    multiple: number | null;
    name: string;
    price: number;
    start: string;
    idResource: number;
    resourceName: string;
    resourceTags: string[];
    tags: string[];
    minCancelAdvance?: string;
    maxReservationsPerSale?: number;
    maxReservationsPerDay?: number;
    maxActiveReservations?: number;
    onCredit?: boolean;
    dueDate?: string;
    prepayPercent?: number;
  }
  