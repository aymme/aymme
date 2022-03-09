import { Collection, Endpoint, Header, Project, ProjectConfiguration, Response } from '@prisma/client';

export type ProjectWithRelations = Project & { configuration: ProjectConfiguration } & {
  collections: CollectionWithRelations[];
};

type EndpointWithRelations = Endpoint & { headers: Header[] } & { responses: Response[] };
type CollectionWithRelations = Collection & { endpoints: EndpointWithRelations[] };
