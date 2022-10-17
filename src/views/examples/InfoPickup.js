/* eslint-disable react-hooks/exhaustive-deps */
// reactstrap components
import {
  Badge,
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
import { useEffect, useState } from "react";
import { getTransaction } from "services/transactions";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import ModalConfirmation from "components/Modal/Confirmation";
import moment from "moment";

const InfoPickup = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalData: 0,
    totalPage: 0
  })
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [id, setId] = useState('');

  const toggle = () => setIsOpen(!isOpen);

  const getIfoPickupList = async () => {
    setLoading(true);
    const response = await getTransaction({
      currentPage: page === 0 ? 0 : page - 1,
      limit: 10,
      filter: search,
      category: "",
      status
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
    getIfoPickupList()
  }, [page, status])

  const handleChangePage = (page) => {
    setPage(page)
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <ModalConfirmation isOpen={isOpen} toggle={toggle} id={id} getData={getIfoPickupList} />
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col-12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center mb-2">
                  <Col>
                    <h3 className="mb-0">List Informasi Pengambilan</h3>
                  </Col>
                  <Col className="text-right d-flex align-items-center">
                    <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button color="primary" className="ml-2" type="button" onClick={getIfoPickupList}>
                      <i className="fa fa-search" />
                    </Button>
                  </Col>
                </Row>
                <Button size="sm" color="danger" type="button" className={status === 'APPROVE' ? 'disabled' : ''} onClick={() => setStatus('NEW')}>Belum Dikonfirmasi</Button>
                <Button size="sm" color="success" type="button" className={status === 'NEW' ? 'disabled' : ''} onClick={() => setStatus('APPROVE')}>Sudah Dikonfirmasi</Button>
              </CardHeader>
              <div className="table-wrap">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Data Berita Acara</th>
                      <th scope="col">Status Ambil</th>
                      <th scope="col">Data Pengambilan</th>
                      <th scope="col">Konfirmasi</th>
                      <th scope="col">Action</th>
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
                              <b>Nama Tersangka </b>
                              {val?.barangBukti?.namaTersangka}
                            </div>
                            <div>
                              <b>Nomor Register Bukti (BA-5) </b>
                              {val?.barangBukti?.noRegBukti}
                            </div>
                            <div>
                              <b>Perkara </b>
                              {val?.barangBukti?.perkara}
                            </div>
                            <div>
                              <b>Barang Bukti </b>
                              {val?.barangBukti?.barangBukti1}
                            </div>
                            <div>
                              <b>Jaksa </b>
                              {val?.barangBukti?.namaJaksa}
                            </div>
                          </td>
                          <td>
                            {val?.barangBukti?.statusNoReg === 'OPEN' && (
                              <Badge color="danger">
                                Belum Isi Form
                              </Badge>
                            )}
                            {val?.barangBukti?.statusNoReg === 'CLAIM' && (
                              <Badge color="warning">
                                Sudah Isi Form
                              </Badge>
                            )}
                            {val?.barangBukti?.statusNoReg === 'CLOSE' && (
                              <Badge color="success">
                                Sudah Di Ambil
                              </Badge>
                            )}
                          </td>
                          <td>
                            <div>
                              <b>No. KTP Pengambil </b>
                              {val?.nikPengambil}
                            </div>
                            <div>
                              <b>Nama Pengambil </b>
                              {val?.namaPengambil}
                            </div>
                            <div>
                              <b>Pengambilan Barang Bukti </b>
                              {val?.pengambilanBb}
                            </div>
                            <div>
                              <b>Foto KTP Pengambil </b>
                              [Lihat Gambar / Dokumen]
                            </div>
                            <div>
                              <b>Foto Bukti Kepemilikan </b>
                              [Lihat Gambar / Dokumen]
                            </div>
                          </td>
                          <td>
                            {val?.statusClaim === 'NEW' ? 'Pihak Kejaksaan Belum Konfirmasi' : val?.statusClaim === 'REJECT' ? 'Ditolak' : `Sudah Dikonfirmasi ${val?.admin?.name} pada Tanggal ${moment(val?.createdDate).format('DD-MMM-YYYY hh:mm:ss')}`}
                          </td>
                          <td>
                            {val?.barangBukti?.statusNoReg !== 'CLOSE' && (
                              <Button type="button" size="sm" color="success" onClick={() => {
                                setId(val.id)
                                toggle()
                              }}>
                                Konfirmasi
                              </Button>
                            )}
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

export default InfoPickup;
