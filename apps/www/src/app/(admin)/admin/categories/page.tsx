"use client"

import { useSuspenseTags } from "@/services/tag/hooks/use-get-tags"
import { GeneralModalTrigger } from "../../../../components/customs/custom-modals/general-modal/client"
import { Button } from "../../../../components/ui/button"
import { DataTable } from "../../../../components/ui/data-table"
import { DataTableDateRangeFilter } from "../../../../components/ui/data-table/components/data-table-date-range-filter"
import {
  DataTableResetFilter,
  DataTableSearcher,
  DataTableSelectionImpact,
  DataTableStacked,
  DataTableToolbar,
} from "../../../../components/ui/data-table/data-table-filters"
import { usePrompt } from "../../../../components/ui/use-prompt"
import { useColumns } from "./_hooks/use-columns"

export interface PostsListProps {}

const PostsList = (props: PostsListProps) => {
  const columns = useColumns()
  const prompt = usePrompt()

  const { data } = useSuspenseTags()
  const records = data.result

  return (
    <DataTable
      rowId="id"
      data={records}
      columns={columns}
      pagination={{
        pageIndex: 0,
        pageSize: 12,
      }}
      maxHeight={600}
      header={
        <DataTableToolbar>
          <DataTableStacked fullWidth>
            <DataTableSearcher placeholder="Search all columns" isGlobal />
            <DataTableSelectionImpact>
              <Button
                variant="secondary"
                onClick={() =>
                  prompt({
                    title: "Are you absolutely sure?",
                    description:
                      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
                  }).then((isConfirmed) => {
                    console.log(isConfirmed)
                  })
                }
              >
                Bulk delete
              </Button>
              <GeneralModalTrigger
                loader="TemplateForm"
                details={{
                  title: "Create category",
                  size: "md",
                  description: "Create the category for your posts.",
                }}
              >
                <Button variant="secondary">Modal</Button>
              </GeneralModalTrigger>
            </DataTableSelectionImpact>
            <DataTableDateRangeFilter
              column="createdAt"
              className="ml-auto"
              inputClassName="ml-auto"
            />
            <DataTableResetFilter />
          </DataTableStacked>
        </DataTableToolbar>
      }
    />
  )
}

export default PostsList
