"use client";

import { useState } from "react";
import DestinationInput from "../search/DestinationInput";
import { Button } from "../ui/button";

type Props = {
  query: any;
  loading: boolean;
  onChange: (newQuery: any) => void;
};

export default function PropertyFilter({ query, loading, onChange }: Props) {
  const [draft, setDraft] = useState<any>(query);
  

  function applyFilter() {
    console.log("Applying filter");
    console.log(draft);
    onChange({
      ...draft,
      page: 1,
    });
  }

  return (
    <div className="w-full rounded-full border bg-white shadow-sm px-6 py-4">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">

 
        <div className="flex-1">
          <DestinationInput
            onSelect={(loc) => {
              setDraft((p: any) => ({
                ...p,
                latitude: loc.latitude,
                longitude: loc.longitude,
              }));
            }}
          />
        </div>


        <div className="flex-1">
          <input
            type="date"
            className="w-full rounded-full border px-4 py-2 text-sm"
            value={draft.checkIn || ""}
            onChange={(e) =>
              setDraft((p: any) => ({ ...p, checkIn: e.target.value }))
            }
          />
        </div>


        <div className="flex-1">
          <input
            placeholder="Search property..."
            className="w-full rounded-full border px-4 py-2 text-sm"
            value={draft.search || ""}
            onChange={(e) =>
              setDraft((p: any) => ({ ...p, search: e.target.value }))
            }
          />
        </div>


        <div className="flex-1">
          <select
            className="w-full rounded-full border px-4 py-2 text-sm"
            value={draft.sortBy || "name"}
            onChange={(e) =>
              setDraft((p: any) => ({ ...p, sortBy: e.target.value }))
            }
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>

        <div>
          <select
          className="w-full rounded-full border px-4 py-2 text-sm"
          value={draft.sortOrder || "asc"}
          onChange={(e)=>
            setDraft((p:any)=>({
              ...p,
              sortOrder :e.target.value,
            }))
          }
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        <div className="shrink-0">
          <Button
            onClick={applyFilter}
            disabled={loading}
            className={loading ? "cursor-wait" : "cursor-pointer"}
            
          >
            {loading ? "searching" : "search"}
          </Button>
        </div>

      </div>
    </div>
);

}
