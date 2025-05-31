export interface HouseDetail {
  details: {
    houseId: string;
    cups?: string;
    address?: string;
  };
  houseMetadata: {
    firstDateEnergy?: string | null;
    firstDatePower?: string | null;
    firstDateCost?: string | null;
    isOwner?: boolean;
  };
  houseIntegrations: {
    huaweiB2C?: {
      status: string;
    };
    froniusB2C?: {
      status: string;
    };
  };
}

export interface House {
  houseId: string;
  cups?: string;
  address?: string;
} 