import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export interface Feature {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  person: string;
  column_name: string;
  timestamp: number | bigint;
  createdAt?: Date;
}

export async function getFeatures(): Promise<Feature[]> {
  const raw = await prisma.feature.findMany({
    orderBy: { timestamp: 'asc' },
  });
  
  return raw.map(f => ({
    id: f.id,
    title: f.title,
    description: f.description,
    category: f.category,
    person: f.person,
    column_name: f.columnName,
    timestamp: typeof f.timestamp === 'bigint' ? Number(f.timestamp) : f.timestamp,
    createdAt: f.createdAt,
  }));
}

export async function addFeature(feature: Omit<Feature, 'timestamp' | 'createdAt'>) {
  return prisma.feature.create({
    data: {
      id: feature.id,
      title: feature.title,
      description: feature.description,
      category: feature.category,
      person: feature.person,
      columnName: feature.column_name,
      timestamp: BigInt(Date.now()),
    },
  });
}

export async function deleteFeature(id: string) {
  return prisma.feature.delete({
    where: { id },
  });
}

export async function updateFeature(id: string, data: Partial<Feature>) {
  const updateData: any = {};
  
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.category !== undefined) updateData.category = data.category;
  if (data.person !== undefined) updateData.person = data.person;
  if (data.column_name !== undefined) updateData.columnName = data.column_name;
  if (data.timestamp !== undefined) updateData.timestamp = BigInt(data.timestamp as any);
  
  return prisma.feature.update({
    where: { id },
    data: updateData,
  });
}
