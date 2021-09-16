import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
  // First thing it does is asks the read function for those items
  // We can either do one of two things:
  // We can return the items because they are already in the cache
  // Or we can return false from here (make a network request)
  return {
    kayargs: false, // Tells Apollo we'll take care of everything
    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
      const { skip, first } = args;
      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // If there items
      // AND there aren't enough to satisfy what was requested
      // AND we are on the last page
      // THEN just send it
      if (items.length && items.length !== first && page == pages) {
        return items;
      }

      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        return false;
      }

      // If there are items, return them from the cahce. Don't go to the network
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache!. Gonna send them to Apollo`
        );
        return items;
      }

      return false; //  fallback to network
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo client comes back from the network with our products
      console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // Finally, return the merged items from the cache
      // Apollo will run the read function again
      return merged;
    }
  };
}
