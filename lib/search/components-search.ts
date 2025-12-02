import { Search } from "@upstash/search";
import { UPSTASH_CONFIG } from "../upstash-config";

// Component content type
export type ComponentContent = {
  title: string;
  description: string;
  category: "input" | "display" | "layout" | "feedback" | "navigation" | "overlay";
  subcategory: string;
  tags: string[];
};

// Component metadata type
export type ComponentMetadata = {
  file: string;
  exports: string[];
  dependencies?: string[];
  difficulty: "easy" | "medium" | "hard";
};

// Initialize Search client
const client = new Search(UPSTASH_CONFIG);

// Create or access the components index
export const componentIndex = client.index<ComponentContent, ComponentMetadata>("components");

// Upsert components into the index
export async function upsertComponents(
  components: Array<{
    id: string;
    content: ComponentContent;
    metadata: ComponentMetadata;
  }>
) {
  try {
    await componentIndex.upsert(components);
    console.log(`Successfully upserted ${components.length} components`);
  } catch (error) {
    console.error("Error upserting components:", error);
    throw error;
  }
}

// Fetch components by IDs
export async function fetchComponentsByIds(ids: string[]) {
  try {
    const documents = await componentIndex.fetch({
      ids,
    });
    return documents;
  } catch (error) {
    console.error("Error fetching components by IDs:", error);
    throw error;
  }
}

// AI search components with reranking (best for relevance)
export async function searchComponentsWithReranking(query: string, limit: number = 10) {
  try {
    const results = await componentIndex.search({
      query,
      limit,
      reranking: true,
    });
    return results;
  } catch (error) {
    console.error("Error searching components with reranking:", error);
    throw error;
  }
}

// AI search with semantic only (meaning-based)
export async function searchComponentsSemantic(query: string, limit: number = 10) {
  try {
    const results = await componentIndex.search({
      query,
      limit,
      semanticWeight: 1,
    });
    return results;
  } catch (error) {
    console.error("Error searching components semantically:", error);
    throw error;
  }
}

// AI search with full-text only (keyword-based)
export async function searchComponentsFullText(query: string, limit: number = 10) {
  try {
    const results = await componentIndex.search({
      query,
      limit,
      semanticWeight: 0,
    });
    return results;
  } catch (error) {
    console.error("Error searching components full-text:", error);
    throw error;
  }
}

// AI search with balanced semantic + full-text
export async function searchComponentsBalanced(query: string, limit: number = 10) {
  try {
    const results = await componentIndex.search({
      query,
      limit,
      semanticWeight: 0.5,
    });
    return results;
  } catch (error) {
    console.error("Error searching components balanced:", error);
    throw error;
  }
}

// Search with category filter
export async function searchComponentsByCategory(
  query: string,
  category: ComponentContent["category"],
  limit: number = 10
) {
  try {
    const results = await componentIndex.search({
      query,
      limit,
      filter: `category = '${category}'`,
      reranking: true,
    });
    return results;
  } catch (error) {
    console.error("Error searching components by category:", error);
    throw error;
  }
}

// Search with difficulty filter
export async function searchComponentsByDifficulty(
  query: string,
  difficulty: ComponentMetadata["difficulty"],
  limit: number = 10
) {
  try {
    const results = await componentIndex.search({
      query,
      limit,
      filter: `difficulty = '${difficulty}'`,
      reranking: true,
    });
    return results;
  } catch (error) {
    console.error("Error searching components by difficulty:", error);
    throw error;
  }
}

// Delete a component by ID
export async function deleteComponent(id: string) {
  try {
    await componentIndex.delete({
      ids: [id],
    });
    console.log(`Deleted component: ${id}`);
  } catch (error) {
    console.error("Error deleting component:", error);
    throw error;
  }
}

// Delete multiple components
export async function deleteComponents(ids: string[]) {
  try {
    await componentIndex.delete({
      ids,
    });
    console.log(`Deleted ${ids.length} components`);
  } catch (error) {
    console.error("Error deleting components:", error);
    throw error;
  }
}

// Range search (pagination)
export async function rangeSearchComponents(cursor: string = "0", limit: number = 10) {
  try {
    const { nextCursor, documents } = await componentIndex.range({
      cursor,
      limit,
    });
    return { nextCursor, documents };
  } catch (error) {
    console.error("Error range searching components:", error);
    throw error;
  }
}

// Get index info and namespace statistics
export async function getComponentIndexInfo() {
  try {
    const info = await client.info();
    return info;
  } catch (error) {
    console.error("Error getting index info:", error);
    throw error;
  }
}

// Reset the index (delete all documents) - USE WITH CAUTION
export async function resetComponentIndex() {
  try {
    await componentIndex.reset();
    console.log("Component index reset successfully");
  } catch (error) {
    console.error("Error resetting component index:", error);
    throw error;
  }
}

export async function getAllComponents() {
  try {
    const results = await componentIndex.range({ cursor: "0", limit: 1000 });
    return results.documents;
  } catch (error) {
    console.error("Error getting all components:", error);
    return [];
  }
}
