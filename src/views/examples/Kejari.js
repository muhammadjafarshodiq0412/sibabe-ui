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
import ModalKejari from "components/Modal/Kejari";
import { useEffect, useState } from "react";
import { getUser } from "services/users";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import { deleteUser } from "services/users";

const Kejari = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [created, setCreated] = useState(true);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalData: 0,
    totalPage: 0
  })
  const [loading, setLoading] = useState(false);
  const [dataModal, setDataModal] = useState('');

  const getUserList = async () => {
    setLoading(true);
    const response = await getUser({
      currentPage: page === 0 ? 0 : page - 1,
      limit: 10,
      filter: search,
      role: "ADMIN"
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
    getUserList()
  }, [page])

  const handleChangePage = (page) => {
    setPage(page)
  }

  const toggle = () => setIsOpen(!isOpen);

  const deleteData = async (id) => {
    Swal.fire({
      icon: 'question',
      title: 'Hapus Data?',
      text: 'Apakah Anda Yakin?',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    }).then(async (value) => {
      if (value.isConfirmed) {
        setLoading(true)
        const response = await deleteUser(id)
        if (response.error) {
          Swal.fire({
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 1500
          })
          getUserList()
        }
        setLoading(false)
      }
    })
  }

  return (
    <>
      <ModalKejari isOpen={isOpen} created={created} toggle={toggle} payload={dataModal} getData={getUserList} />
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
                    <h3 className="mb-0">List Kejari</h3>
                  </Col>
                  <Col className="text-right d-flex align-items-center">
                    <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button color="primary" className="ml-2" onClick={getUserList}>
                      <i className="fa fa-search" />
                    </Button>
                  </Col>
                </Row>
                <Button size="sm" color="primary" onClick={() => {
                  setCreated(true)
                  toggle()
                }}>Tambah Kejari</Button>
              </CardHeader>
              <div className="table-wrap">
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama Kejari</th>
                      <th scope="col">Nomor Whatsapp</th>
                      <th scope="col">Email Aktif</th>
                      <th scope="col">Username</th>
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
                          <td>{val.name}</td>
                          <td>{val.phoneNumber}</td>
                          <td>
                            {val.email}
                          </td>
                          <td>
                            {val.username}
                          </td>
                          <td className="text-right">
                            <div className="d-flex align-items-center">
                              <Button type="button" size="sm" onClick={() => {
                                setCreated(false);
                                setDataModal(val);
                                toggle();
                              }}>
                                <i className="fa fa-edit" />
                              </Button>
                              <Button type="button" size="sm" onClick={() => deleteData(val.id)}>
                                <i className="fa fa-trash text-danger" />
                              </Button>
                            </div>
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

export default Kejari;
