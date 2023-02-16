import React from "react";
import { Table } from "react-bootstrap";
import Pagination from "../Pagination";
import TbodyWithAction from "../TbodyWithAction";
import Thead from "../Thead";

export default function TableWithAction({
  withoutPagination,
  handlePageClick,
  actionNotDisplay,
  data,
  thead,
  tbody,
  editUrl,
  deleteAction,
  customAction,
  status,
  pages,
}) {
  return (
    <>
      <Table striped bordered hover>
        <Thead text={thead} />
        <TbodyWithAction
          status={status}
          data={data}
          display={tbody}
          editUrl={editUrl}
          deleteAction={deleteAction}
          actionNotDisplay={actionNotDisplay}
          customAction={customAction}
        />
      </Table>
      {!withoutPagination && data.length ? (
        <Pagination pages={pages} handlePageClick={handlePageClick} />
      ) : (
        ""
      )}
    </>
  );
}
