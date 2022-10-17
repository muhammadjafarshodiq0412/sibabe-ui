/* eslint-disable react-hooks/exhaustive-deps */
// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
  Button,
  Col,
  Input
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { getItemEvidanceMonitoring } from "services/itemEvidances";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";

const MonitoringKejari = () => {

  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalData: 0,
    totalPage: 0
  })
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const getMonitoringList = async () => {
    setLoading(true);
    const response = await getItemEvidanceMonitoring({
      currentPage: page === 0 ? 0 : page - 1,
      limit: 10,
      filter: search,
    })
    if (response.error) {
      Swal.fire({
        icon: 'error',
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      setData(response.payload.content)
      const pageInfo = {
        totalData: response.payload.totalElements,
        totalPage: response.payload.totalPages
      }
      setPageInfo(pageInfo)
    }
    setLoading(false);
  }

  useEffect(() => {
    getMonitoringList()
  }, [page])

  const handleChangePage = (page) => {
    setPage(page)
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col-12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col>
                    <h3 className="mb-0">List Monitong Kejari</h3>
                  </Col>
                  <Col className="text-right d-flex align-items-center">
                    <Input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                    <Button color="primary" className="ml-2" type="button" onClick={getMonitoringList}>
                      <i className="fa fa-search" />
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <div className="table-wrap">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama Kejari</th>
                      <th scope="col">Belum Diambil</th>
                      <th scope="col">Sudah Isi Form</th>
                      <th scope="col">Sudah Jadwal Ambil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <th colSpan="6" className="text-center">
                          Loading...
                        </th>
                      </tr>
                    ) : data.length > 0 ? data.map((val, idx) => {
                      return (
                        <tr key={String(idx)}>
                          <th scope="row">
                            {(Number(page + 1) * 10) - (10 - (idx + 1))}
                          </th>
                          <td>
                            <div>
                              {val?.adminName}
                            </div>
                            <div>
                              Nomor Whatsapp: {val?.phoneNumber}
                            </div>
                            <div>
                              Email Aktif: {val?.email}
                            </div>
                          </td>
                          <td>{val?.belumDiambil} Barang Bukti</td>
                          <td>
                            {val?.sudahIsiFrom} Barang Bukti
                          </td>
                          <td>
                            {val?.sudahDiAmbil} Barang Bukti
                          </td>
                        </tr>
                      )
                    }) : (
                      <tr>
                        <th colSpan="6" className="text-center">
                          Data Kosong
                        </th>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <CardFooter className="py-4">
                {pageInfo.totalData > 0 && (
                  <div className="d-flex justify-content-end mt-4">
                    <Pagination
                      activePage={page + 1}
                      itemsCountPerPage={15}
                      totalItemsCount={pageInfo.totalData}
                      pageRangeDisplayed={3}
                      onChange={handleChangePage.bind(this)}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                )}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default MonitoringKejari;
