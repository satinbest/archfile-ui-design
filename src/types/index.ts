export type SoftwareFormat = 
  | 'Revit'
  | '3ds Max'
  | 'AutoCAD'
  | 'SketchUp'
  | 'V-Ray'
  | 'Corona'
  | 'Lumion'
  | 'Blender'
  | 'PBR 8K'
  | 'DWG + 3D';

export type AssetCategory = 
  | 'villa'
  | 'interior'
  | 'facade'
  | 'textures'
  | 'pavilion'
  | 'landscape';

export interface ArchAsset {
  id: string;
  title: string;
  category: AssetCategory;
  categoryLabel: string;
  formatBadge: string;
  primarySoftware: SoftwareFormat;
  supportedSoftware: SoftwareFormat[];
  price: number; // in Toman
  priceFormatted: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  galleryImages: string[];
  fileSize: string;
  polygonCount: string;
  verticesCount: string;
  texturesIncluded: string[];
  year: string;
  rating: number;
  downloadCount: number;
  featured?: boolean;
  architectStudio?: string;
  location?: string;
}

export interface CategoryInfo {
  id: AssetCategory;
  title: string;
  countLabel: string;
  description: string;
  imageUrl: string;
  softwareSupported: string[];
}

export interface CartItem {
  asset: ArchAsset;
  addedAt: Date;
}

export interface UserAccount {
  name: string;
  email: string;
  phone: string;
  role: string;
  purchasedAssetIds: string[];
  joinedDate: string;
}
