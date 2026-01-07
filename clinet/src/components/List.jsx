import React from "react";
import { Trash, EllipsisVertical } from "lucide-react";
import { Menu , Divider} from "@mantine/core";

function List({ data }) {
  return (
    <div className="">
      {data.length > 0
        ? data.map((rh) => (
            <>
              <div className="flex items-center">
                <Menu>
                  <Menu.Target>
                    <EllipsisVertical />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item color="red" leftSection={<Trash size={"16"} />}>
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
                <a
                  href={rh.url}
                  target="_blank"
                  className="black p-2 hover:underline "
                >
                  {rh.title}
                </a>
              </div>
              <Divider />
            </>
          ))
        : null}
    </div>
  );
}
export default List;
